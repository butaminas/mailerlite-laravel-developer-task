<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class FieldRequest extends FormRequest
{
    protected $stopOnFirstFailure = true;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $updateRules = match($this->method()){
            'PUT', 'PATCH' => '|sometimes',
            default => ''
        };

        return [
            'title' => 'required|string|max:255|unique:fields,title,'. $this->field . $updateRules,
            'type' => 'required|string|max:255'. $updateRules
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        throw new HttpResponseException(response()->json([
            'error' => $validator->errors()->first()
        ], 422));
    }

    protected function failedAuthorization(): HttpResponseException
    {
        throw new HttpResponseException(response()->json([
            'error' => 'Unauthorized'
        ], 422));
    }
}
