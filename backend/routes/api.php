<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\ListController;
use App\Http\Controllers\Api\ListProductController;
use App\Http\Controllers\AuthController;

Route::middleware(['auth:sanctum'])->group(function () {
 
    Route::get('products', [ProductsController::class, 'index']);

    Route::post('list', [ListController::class, 'store']);
    Route::get('list', [ListController::class, 'index']);
    Route::get('list/{id}', [ListController::class, 'show']);
    Route::post('list-edit/{id}', [ListController::class, 'update']);
    Route::get('list-archive/{id}', [ListController::class, 'archive']);
    Route::get('list-delete/{id}', [ListController::class, 'destroy']);

    Route::post('list-product-create', [ListProductController::class, 'store']);
    Route::get('list-products', [ListProductController::class, 'index']);
    Route::get('list-product/{id}', [ListProductController::class, 'show']);
    Route::post('list-status-approved/{id}', [ListProductController::class, 'statusApproved']);
    Route::post('list-status-destoy/{id}', [ListProductController::class, 'statusDestroy']);
    Route::post('list-quantity-update/{id}', [ListProductController::class, 'quantityUpdate']);
    Route::get('list-product-delete/{id}', [ListProductController::class, 'destroy']);
});

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

