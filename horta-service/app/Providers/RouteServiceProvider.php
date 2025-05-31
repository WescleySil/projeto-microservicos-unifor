<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;
use App\Http\Middleware\AuthenticateWithAuthService;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(Router $router): void
    {
        $router->aliasMiddleware('auth.remote', AuthenticateWithAuthService::class);
    }
}

