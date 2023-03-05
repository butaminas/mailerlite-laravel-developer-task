<?php

namespace Database\Seeders;

use App\Models\Field;
use App\Models\Subscriber;
use App\Models\SubscriberField;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriberFieldsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SubscriberField::create([
            'subscriber_id' => Subscriber::first()->id,
            'field_id' => Field::first()->id,
            'value' => 'Dragonborn'
        ]);
    }
}
