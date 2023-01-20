<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;
use Validator;

class SubscriberController extends Controller
{
    public function getSingle(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'id' => 'required|integer',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->messages()->first()], 400);
            }

            return response()->json(Subscriber::where('id', $request->id)->first());

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getAll(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            return response()->json(Subscriber::with('fields')->orderBy('created_at', 'desc')->paginate(5));

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'id' => 'integer',
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:subscribers,email,'.$request->id,
                'state' => 'required|string|max:255|not_in:Select state',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->messages()->first()], 400);
            }

            $newSub = Subscriber::updateOrCreate(
                ['id' => $request->id],
                [
                    'name' => (string) $request->name,
                    'email' => $request->email,
                    'state' => $request->state
                ]
            );

            $subData = ['id' => $newSub->id, 'fields' => $request->fields];

            if ($request->fields && count($request->fields) > 0) {
                $fieldsController = new FieldController();
                return $fieldsController->create(new Request($subData));
            }

            return response()->json(true);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function delete(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'id' => 'required|integer'
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->messages()->first()], 400);
            }

            if ($sub = Subscriber::where('id', (int) $request->id)->first()) {
                $sub->delete();
            } else {
                return response()->json(['error' => 'Subscriber not found and could not be deleted.'], 400);
            }

            return response()->json(true);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
