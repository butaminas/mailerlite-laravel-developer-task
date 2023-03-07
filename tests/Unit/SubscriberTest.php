<?php

use App\Models\Field;
use App\Models\Subscriber;
use App\Models\SubscriberField;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('can create subscriber', function () {
    $subscriber = Subscriber::factory()->create();

    expect($subscriber)->toBeInstanceOf(Subscriber::class);
});

test('can update subscriber', function () {
    $subscriber = Subscriber::factory()->create();
    $subscriber->name = "Updated name";
    $subscriber->save();

    expect($subscriber->name)->toBe("Updated name");
});

test('can assign custom fields to subscriber', function () {
    $subscriber = Subscriber::factory()->create();
    $field = Field::factory()->create();
    SubscriberField::create([
        'subscriber_id' => $subscriber->id,
        'field_id' => $field->id,
        'value' => 'Dragonborn'
    ]);

    expect($subscriber->fields()->first()->value)->toBe("Dragonborn");
});
