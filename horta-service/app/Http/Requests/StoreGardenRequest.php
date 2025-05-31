<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGardenRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3'],
            'description' => ['required', 'string', 'min:3'],
            'planting_date' => ['required', 'date'],
        ];
    }
}
