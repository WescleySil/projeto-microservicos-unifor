<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('reports')->insert([
            'title' => 'Relatorio 1',
            'description' => 'lorem ipsum',
            'report_type' => 'Planta',
            'user_id' => 1,
            'created_at' => now()->subYear()->format('Y-m-d H:i:s'),
        ]);
    }
}
