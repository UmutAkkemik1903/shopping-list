<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userData = [
            [
                'name' => 'kullanici1',
                'email' => 'kullanici1@gmail.com',
                'password' => bcrypt('123456'),
            ],
            [
                'name' => 'kullanici2',
                'email' => 'kullanici2@gmail.com',
                'password' => bcrypt('123456'),
            ],
        ];

        foreach ($userData as $user) {
            User::create($user);
        }
    }
}
