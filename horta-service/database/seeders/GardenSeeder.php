<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GardenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('gardens')->insert([
            'name' => 'Horta 1',
            'description' => 'Horta de frutas anciãs',
            'planting_date' => now()->subYear()->format('Y-m-d'),
            'user_id' => 1,
            'created_at' => now()->subYear()->format('Y-m-d H:i:s'),
        ]);
    }
}
