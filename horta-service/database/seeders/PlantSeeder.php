<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('plants')->insert([
            'name' => 'Planta 1',
            'plant_type' => 'frutas anciãs',
            'planting_date' => now()->subYear()->format('Y-m-d'),
            'user_id' => 1,
            'created_at' => now()->subYear()->format('Y-m-d H:i:s'),
        ]);
    }
}
