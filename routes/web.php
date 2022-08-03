<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DavidController;
use App\Http\Controllers\KrilingController;
use App\Http\Controllers\ManuelController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/offline', function () {    
    return view('vendor/laravelpwa/offline');
});



Route::resource('/portafolioDavid',DavidController::class);

Route::resource('/portafolioKriling',KrilingController::class);

Route::resource('/portafolioManuel',ManuelController::class);


