<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscriberRequest;
use App\Models\Subscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Validator;

class SubscriberController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            return response()->json(Subscriber::with('fields')->orderBy('created_at', 'desc')->paginate(5));
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
                $subData = ['id' => $newSub->id, 'fields' => $validatedData->fields];
                return (new FieldController())->create(new Request($subData));
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
            Subscriber::find($request->subscriber)->update($validatedData);

            if ($request->fields && count($request->fields) > 0) {
                $subData = ['id' => $request->subscriber, 'fields' => $request->fields];
                return (new FieldController())->create(new Request($subData));
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
}
