<?php

namespace App\Services\Auth;

use App\Http\Resources\UserResource;
use App\Models\User;

class LoginService
{
    private User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function run(array $data): array
    {
        $user = User::where('email', $data['login'])->first();

        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => new UserResource($user),
        ];
    }
}
