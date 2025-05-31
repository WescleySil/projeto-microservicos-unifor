<?php

use App\Http\Controllers\GardenController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.remote')->group(function () {
    Route::prefix('gardens')->group(function () {
        Route::get('/', [GardenController::class, 'index']);
        Route::post('/', [GardenController::class, 'store']);
        Route::put('/{garden}', [GardenController::class, 'update']);
        Route::delete('/{garden}', [GardenController::class, 'destroy']);
    });
});
