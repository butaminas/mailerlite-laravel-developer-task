<?php

namespace App\Http\Controllers;

use App\Http\Requests\FieldRequest;
use App\Http\Requests\SubscriberFieldRequest;
use App\Http\Requests\SubscriberRequest;
use App\Models\Subscriber;
use App\Models\SubscriberField;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Validator;

class SubscriberController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            return response()->json(Subscriber::orderBy('created_at', 'desc')->paginate(5));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(Subscriber $subscriber): JsonResponse
    {
        try {
            return response()->json($subscriber);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(SubscriberRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            $newSub = Subscriber::create($validatedData);

            if ($request->fields && count($request->fields) > 0) {
                $validatedFieldsData = new SubscriberFieldRequest($request->fields);
                $updatedData = $this->updateFieldsData($validatedFieldsData, $newSub->id);

                SubscriberField::insert($updatedData);
            }

            return response()->json(true);
        } catch (\Exception $e) {
            $newSub?->delete();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(SubscriberRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();
            Subscriber::find($request->subscriber)?->update($validatedData);

            if ($request->fields && count($request->fields) > 0) {
                $validatedFieldsData = new SubscriberFieldRequest($request->fields);
                SubscriberField::where('subscriber_id', $request->subscriber)->delete();
                $updatedData = $this->updateFieldsData($validatedFieldsData, $request->subscriber);

                SubscriberField::insert($updatedData);
            }

            return response()->json(true);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Subscriber $subscriber): JsonResponse
    {
        try {
            $subscriber->delete();

            return response()->json(true);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateFieldsData($validatedFieldsData, $subscriberID)
    {
        return collect($validatedFieldsData)->filter(function($item) {
            return array_key_exists('id', $item) && array_key_exists('value', $item) && $item['value'];
        })->map(function ($item) use ($subscriberID) {
            return ['field_id' => $item['id'], 'subscriber_id' => (int) $subscriberID, 'value' => $item['value']];
        })->toArray();
    }
}
