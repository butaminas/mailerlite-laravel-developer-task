<?php

namespace App\Http\Controllers;

use App\Http\Requests\FieldRequest;
use App\Models\Field;
use Illuminate\Http\JsonResponse;

class FieldController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            return response()->json(Field::all());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(Field $field): JsonResponse
    {
        try {
            return response()->json($field);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(FieldRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();
            $field = Field::create($validatedData);

            return response()->json($field->id);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(FieldRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();
            Field::find($request->field)?->update($validatedData);

            return response()->json(true);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Field $field): JsonResponse
    {
        try {
            $field->delete();

            return response()->json(true);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
