<?php

namespace Database\Seeders;

use App\Models\Subscriber;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscribersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('subscribers')->insert(Subscriber::factory()->raw());
        DB::table('subscribers')->insert(Subscriber::factory()->raw());
        DB::table('subscribers')->insert(Subscriber::factory()->raw());
        DB::table('subscribers')->insert(Subscriber::factory()->raw());
        DB::table('subscribers')->insert(Subscriber::factory()->raw());
        DB::table('subscribers')->insert(Subscriber::factory()->raw());
    }
}
