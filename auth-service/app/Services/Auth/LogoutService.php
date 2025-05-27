<?php

namespace App\Services\Auth;

class LogoutService
{
    public function run(): bool
    {
        $user = auth()->user();
        $user->currentAccessToken()->delete();

        return true;
    }
}
