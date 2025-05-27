<?php

namespace App\Services\User;

class DeleteUserService
{
    public function run($user)
    {
        return $user->delete();
    }
}
