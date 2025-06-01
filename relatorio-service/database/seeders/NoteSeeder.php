<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('notes')->insert([
            'title' => 'Nota 1',
            'note' => 'lorem ipsum',
            'user_id' => 1,
            'created_at' => now()->subYear()->format('Y-m-d H:i:s'),
        ]);
    }
}
