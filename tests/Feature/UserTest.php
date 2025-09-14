<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_seeder_creates_exactly_one_user()
    {
        // Run the seeder
        $this->seed(\Database\Seeders\UserSeeder::class);
        
        // Assert that only one user exists
        $this->assertDatabaseCount('users', 1);
    }

    /** @test */
    public function user_has_correct_name()
    {
        $this->seed(\Database\Seeders\UserSeeder::class);
        
        $user = User::first();
        
        $this->assertEquals('Admin User', $user->name);
    }

    /** @test */
    public function user_has_correct_email()
    {
        $this->seed(\Database\Seeders\UserSeeder::class);
        
        $user = User::first();
        
        $this->assertEquals('john@review.com', $user->email);
    }

    /** @test */
    public function user_password_is_properly_hashed()
    {
        $this->seed(\Database\Seeders\UserSeeder::class);
        
        $user = User::first();
        
        // Verify password is hashed and matches 'secret'
        $this->assertTrue(\Illuminate\Support\Facades\Hash::check('secret', $user->password));
        
        // Verify wrong password doesn't work
        $this->assertFalse(\Illuminate\Support\Facades\Hash::check('wrongpassword', $user->password));
    }

    /** @test */
    public function user_has_timestamps()
    {
        $this->seed(\Database\Seeders\UserSeeder::class);
        
        $user = User::first();
        
        $this->assertNotNull($user->created_at);
        $this->assertNotNull($user->updated_at);
    }
}