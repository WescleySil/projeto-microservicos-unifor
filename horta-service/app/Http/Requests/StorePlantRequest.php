<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlantRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3'],
            'plant_type' => ['required', 'string', 'min:3'],
            'planting_date' => ['required', 'date'],
        ];
    }
}
