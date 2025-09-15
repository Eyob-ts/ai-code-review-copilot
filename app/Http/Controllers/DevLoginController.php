<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

class DevLoginController extends Controller
{
    public function login ()
    {
        // ✅ Correct spelling: environment
       $this->ensurelocal();
       $user = User::where('email', 'john@review.com')->first()
            ?? User::first();
        if (!$user) {
            return 'No users found. Please create a user first.';
        }
       Auth::login($user);
       return redirect('/dashboard')->with('status', "Logged in as {$user->email}");
    }

    /**
     * Impersonate any user by ID.
     */

    public function impersonate($id)
    {
        $this->ensurelocal();
        $user = User::findOrFail($id);
        Auth::login($user);
        return redirect('/dashboard')->with('status', "Now impersonating {$user->email}");
    }

    /**
     * Reset and reseed database.
     */

    public function resetDb()
    {
        $this->ensurelocal();

        Artisan::call('migrate:fresh --seed');

        return 'Database reset and seeded. <a href="/dashboard">Go to Dashboard</a>';
    }

    private function ensurelocal () 
    {
        if (!app()->environment('local')) {
            abort(403, 'Unauthorized.');
        }
    }


}
