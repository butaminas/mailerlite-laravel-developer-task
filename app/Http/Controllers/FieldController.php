<?php

namespace App\Http\Controllers;

use App\Models\Field;
use App\Models\Subscriber;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Validator;

class FieldController extends Controller
{
    public function getAll(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'id' => 'required|integer',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->messages()->first()], 400);
            }
            return response()->json(Field::find($request->id));

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'id' => 'required|integer',
                'fields.*' => 'array',
                'fields.*.title' => 'required|string|max:255',
                'fields.*.type' => 'required|string|max:255',
                'fields.*.value' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                Subscriber::where('id', $request->id)->delete();
                return response()->json(['error' => $validator->messages()->first()], 400);
            }

            $sub_id = $request->id;
            $new_fields = collect($request->fields)->map(function ($arr) use ($sub_id) {
                $arr['sub_id'] = $sub_id;
                $arr['created_at'] = Carbon::now();
                $arr['updated_at'] = Carbon::now();
                if (array_key_exists('id', $arr)) {
                    unset($arr['id']);
                }
                return $arr;
            });

            if (Subscriber::where('id', $sub_id)->count() > 0) {
                Field::where('sub_id', $sub_id)->delete();
                Field::insert($new_fields->toArray());
            } else {
                return response()->json(['error' => "Subscriber not found."], 400);
            }

            return response()->json(true);

        } catch (\Exception $e) {
            Subscriber::where('id', $request->id)->delete();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
