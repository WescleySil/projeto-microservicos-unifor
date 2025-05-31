<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthenticateWithAuthService
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token não fornecido'], 401);
        }

        $response = Http::withToken($token)
            ->acceptJson()
            ->get('http://auth-service/api/me');

        if ($response->unauthorized()) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        $request->merge(['auth_user' => $response->json()]);

        return $next($request);
    }
}
