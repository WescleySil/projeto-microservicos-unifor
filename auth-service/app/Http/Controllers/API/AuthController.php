<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Services\Auth\LoginService;
use App\Services\Auth\LogoutService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function login(LoginRequest $loginRequest, LoginService $loginService): JsonResponse
    {
        $data = $loginRequest->validated();
        $tokenAndUser = $loginService->run($data);

        return response()->json([
            'data' => $tokenAndUser,
            'message' => 'Usuário logado com sucesso',
        ]);
    }

    public function logout(LogoutService $logoutService): JsonResponse
    {
        $logoutService->run();

        return response()->json([
            'data' => null,
            'message' => 'Usuário deslogado com sucesso',
        ]);
    }

    public function user(): JsonResponse
    {
        return response()->json([
            'data' => new UserResource(auth()->user()),
            'message' => 'Usuário retornado com sucesso',
        ]);
    }
}
