<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// GitHub OAuth with Socialite

Route::get('/auth/github', function () {
    return Socialite::driver('github')->redirect();
})->name('github.login');

Route::get('/auth/github/callback', function () {
    $githubUser = Socialite::driver('github')->user();
    // ...
    // Save or update user in DB
    $user = User::updateOrCreate(
        [
            'github_id' => $githubUser->id,
        ],
        [
            'name'  => $githubUser->name ?? $githubUser->nickname,
            'email' => $githubUser->email,
        ]
    );

    // Log them in
    Auth::login($user);

    // Redirect to dashboard
    return redirect()->route('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
