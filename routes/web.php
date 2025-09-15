<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

if (app()->environment('local')) {
    Route::get('/dev', [DevToolsController::class, 'login']);
    Route::get('/dev/impersonate/{id}', [DevToolsController::class, 'impersonate']);
    Route::get('/dev/reset-db', [DevToolsController::class, 'resetDb']);
}

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
