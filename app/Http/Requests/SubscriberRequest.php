<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SubscriberRequest extends FormRequest
{
    protected $stopOnFirstFailure = true;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, Rule|array|string>
     */
    public function rules(): array
    {
        return match ($this->method()) {
            'PUT', 'PATCH' => $this->update(),
            default => $this->store()
        };
    }

    public function store(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email:rfc,dns|max:255|unique:subscribers,email',
            'state' => 'required|string|max:255|not_in:Select state',
            'fields' => 'nullable|array',
            'fields.*' => 'integer'
        ];
    }

    public function update(): array
    {
        return [
            'name' => 'string|max:255',
            'email' => 'email:rfc,dns|max:255|unique:subscribers,email,' . $this->subscriber,
            'state' => 'string|max:255|not_in:Select state',
            'fields' => 'nullable|array',
            'fields.*' => 'integer'
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
