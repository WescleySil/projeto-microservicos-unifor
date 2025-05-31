<?php

use App\Http\Controllers\GardenController;
use App\Http\Controllers\PlantController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.remote')->group(function () {
    Route::prefix('gardens')->group(function () {
        Route::get('/', [GardenController::class, 'index']);
        Route::post('/', [GardenController::class, 'store']);
        Route::put('/{garden}', [GardenController::class, 'update']);
        Route::delete('/{garden}', [GardenController::class, 'destroy']);
    });

    Route::prefix('plants')->group(function () {
        Route::get('/', [PlantController::class, 'index']);
        Route::post('/', [PlantController::class, 'store']);
        Route::put('/{plant}', [PlantController::class, 'update']);
        Route::delete('/{plant}', [PlantController::class, 'destroy']);
    });
});
