<?php

use App\Models\Field;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('can create field', function () {
    $field = Field::factory()->create();

    expect($field)->toBeInstanceOf(Field::class);
});

test('can update field', function () {
    $field = Field::factory()->create();
    $field->title = "Updated title";
    $field->save();

    expect($field->title)->toBe("Updated title");
});
