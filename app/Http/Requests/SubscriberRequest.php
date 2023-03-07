<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SubscriberRequest extends FormRequest
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
            'name' => 'required|string|max:255'. $updateRules,
            'email' => 'required|email:rfc,dns|max:255|unique:subscribers,email,'.$this->subscriber. $updateRules,
            'state' => 'required|string|max:255|not_in:Select state'. $updateRules,
            'fields' => 'nullable|array',
            'fields.*.id' => 'sometimes|integer',
            'fields.*.value' => 'nullable'
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
