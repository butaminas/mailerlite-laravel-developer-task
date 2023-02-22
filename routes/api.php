<?php

use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\FieldController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Subscribers
Route::apiResource('subscriber', SubscriberController::class);

//Route::resource('subscribers', SubscriberController::class);
//Route::prefix('subscribers')->group(function () {
//    Route::get('/get/single', [SubscriberController::class, 'getSingle']);
//    Route::get('/get/all', [SubscriberController::class, 'getAll']);
//    Route::post('/upsert', [SubscriberController::class, 'create']);
//    Route::delete('/delete', [SubscriberController::class, 'delete']);
//});
// Fields
Route::apiResource('fields', FieldController::class)->only([
    'index'
]);
//Route::prefix('fields')->group(function () {
//    Route::get('/get/all', [FieldController::class, 'getAll']);
//    Route::post('/create', [FieldController::class, 'create']);
//    Route::delete('/delete', [SubscriberController::class, 'delete']);
//});
