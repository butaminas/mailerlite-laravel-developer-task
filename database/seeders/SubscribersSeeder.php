<?php

namespace Database\Seeders;

use App\Models\Subscriber;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscribersSeeder extends Seeder
{
    public function subscriber(): array
    {
        return Subscriber::factory()->raw();
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('subscribers')->insert($this->subscriber());
        DB::table('subscribers')->insert($this->subscriber());
        DB::table('subscribers')->insert($this->subscriber());
        DB::table('subscribers')->insert($this->subscriber());
        DB::table('subscribers')->insert($this->subscriber());
        DB::table('subscribers')->insert($this->subscriber());
    }
}
