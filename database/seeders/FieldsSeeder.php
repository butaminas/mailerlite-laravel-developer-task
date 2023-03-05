<?php

namespace Database\Seeders;

use App\Models\Field;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FieldsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('fields')->insert(Field::factory()->raw());
        DB::table('fields')->insert(Field::factory(['title' => 'Birthday', 'type' => 1])->raw());
        DB::table('fields')->insert(Field::factory(['title' => 'VIP', 'type' =>3])->raw());
        DB::table('fields')->insert(Field::factory(['title' => 'Gifts', 'type' => 2])->raw());
    }
}
