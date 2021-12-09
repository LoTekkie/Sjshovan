<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers;
use Illuminate\Support\Facades\Redirect;

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
    return Inertia::render('Home', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'crisp' => true
    ]);
});

Route::middleware(['auth:sanctum', 'verified'])->prefix('/admin')->name('admin.')->group(function () {
    Route::get('/', function () { return Redirect::route('admin.dashboard'); });
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    if (app()->environment('local')) {
        Route::get('workbench', [Controllers\TestingController::class, 'workbench'])->name('workbench');
    }
});
