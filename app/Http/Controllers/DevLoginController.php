<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

class DevLoginController extends Controller
{
    public function __invoke()
    {
        // ✅ Correct spelling: environment
        if (!app()->environment('local')) {
            abort(403, 'Unauthorized.');
        }

        $user = User::where('email', 'john@review.com')->first()
                 ?? User::first();

        if (!$user) {
            abort(404, 'No user found to log in as.');
        }

        Auth::login($user);

        return redirect('/dashboard');
    }
}
