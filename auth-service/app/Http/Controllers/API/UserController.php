<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\IndexUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\User\DeleteUserService;
use App\Services\User\IndexUserService;
use App\Services\User\StoreUserService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    public function index(
        IndexUserRequest $indexUserRequest,
        IndexUserService $indexUserService
    ): AnonymousResourceCollection {
        $data = $indexUserRequest->validated();
        $users = $indexUserService->run($data);

        return UserResource::collection($users);
    }

    public function store(
        StoreUserRequest $request,
        StoreUserService $storeUserService,
    ) {
        $data = $request->validated();
        $user = $storeUserService->run($data);

        return response()->json([
            'data' => new UserResource($user),
            'message' => 'Usuário criado com sucesso.',
        ]);
    }

    public function destroy(User $user, DeleteUserService $deleteUserService)
    {
        return response()->json([
            'data' => $deleteUserService->run($user),
            'message' => 'Usuário deletado com sucesso',
        ]);
    }
}
