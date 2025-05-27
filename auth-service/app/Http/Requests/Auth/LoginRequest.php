<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class LoginRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'login' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $user = User::where('email', $this->login)->first();

            if ($user) {
                if (! Auth::attempt(['email' => $user->email, 'password' => $this->password])) {
                    $validator->errors()->add('password', 'Senha incorreta');
                }

            } else {
                $validator->errors()->add('login', 'Usuário não encontrado');
            }
        });
    }
}
