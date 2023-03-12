<?php

use App\Models\Field;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('does not create a field without missing fields', function () {
    $response = $this->postJson('/api/field', []);
    $response->assertStatus(422);

    $response = $this->postJson('/api/field', [
        'type' => 'Boolean'
    ]);
    $response->assertStatus(422);

    $response = $this->postJson('/api/field', [
        'title' => 'Username'
    ]);
    $response->assertStatus(422);
});

it('it will edit a field', function () {
    $field = field::factory()->create();
    $response = $this->patch('/api/field/'.$field->id, [
        'title' => 'new title'
    ]);
    expect(field::find($field->id)->title)->toBe('new title')
        ->and(field::find($field->id)->type)->toBe('string');
    $response->assertStatus(200);
});

it('it will delete a field', function () {
    $field = field::factory()->create();
    $response = $this->delete('/api/field/'.$field->id);
    expect(field::find($field->id))->toBeNull();
    $response->assertStatus(200);
});
