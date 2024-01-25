<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/product", [ProductController::class, "index"]);
Route::post("/product", [ProductController::class, "store"]);
Route::post("/product/{id}", [ProductController::class, "update"]);
Route::get("/product/{id}", [ProductController::class, "edit"]);
Route::delete("/product/{id}", [ProductController::class, "destroy"]);
