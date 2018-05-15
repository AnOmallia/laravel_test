<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(!DB::table('users')->where('email', 'admin@admin.com')->exists()){
            DB::table('users')->insert([
                'name' => str_random(10),
                'email' => 'admin@admin.com',
                'password' => bcrypt('password'),
                'is_admin' => 1,
            ]);
        }
    }
}
