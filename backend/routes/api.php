<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\ListController;
use App\Http\Controllers\AuthController;

Route::middleware(['auth:sanctum'])->group(function () {
 
    Route::get('products', [ProductsController::class, 'index']);

    Route::post('list', [ListController::class, 'store']);
    Route::get('list', [ListController::class, 'index']);
    Route::get('list/{id}', [ListController::class, 'show']);
    Route::post('list-edit/{id}', [ListController::class, 'update']);
    Route::get('list-delete/{id}', [ListController::class, 'archive']);
});

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

