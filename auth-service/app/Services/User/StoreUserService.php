<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class StoreUserService
{
    private User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function run($data)
    {
        $data['password'] = Hash::make($data['password']);

        return $this->user->create($data);
    }
}
