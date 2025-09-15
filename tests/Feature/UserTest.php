<?php

use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

// 'describe' is used to group related tests
describe('User Seeder', function () {

    // This runs before each test in this group, reducing repetition!
    beforeEach(function () {
        $this->seed(UserSeeder::class);
    });

    // No more docblocks! The function name is the test name.
    it('creates exactly one user', function () {
        // Pest's expectation API: Read it like English.
        // "Expect that the database count for 'users' to be 1"
        expect(DB::table('users')->count())->toBe(1);

        // Alternatively, using Laravel's assert helper (still works):
        // $this->assertDatabaseCount('users', 1);
    });

    it('has the correct name', function () {
        $user = User::first();
        // "Expect the user's name to be 'Admin User'"
        expect($user->name)->toBe('Admin User');
    });

    it('has the correct email', function () {
        $user = User::first();
        expect($user->email)->toBe('john@review.com');
    });

    it('has a properly hashed password', function () {
        $user = User::first();

        // "Expect that Hash::check for 'secret' is true"
        expect(Hash::check('secret', $user->password))->toBeTrue();

        // "Expect that Hash::check for 'wrongpassword' is false"
        expect(Hash::check('wrongpassword', $user->password))->toBeFalse();
    });

    it('has timestamps', function () {
        $user = User::first();
        expect($user->created_at)->not->toBeNull()
            ->and($user->updated_at)->not->toBeNull();
    });
});
