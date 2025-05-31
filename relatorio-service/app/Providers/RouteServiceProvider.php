<?php

namespace App\Providers;

use App\Http\Middleware\AuthenticateWithAuthService;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(Router $router): void
    {
        $router->aliasMiddleware('auth.remote', AuthenticateWithAuthService::class);
    }
}
