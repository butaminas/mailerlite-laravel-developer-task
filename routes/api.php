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

// Fields
Route::apiResource('field', FieldController::class);
