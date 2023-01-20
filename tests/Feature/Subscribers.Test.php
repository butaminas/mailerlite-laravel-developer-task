<?php

use App\Models\Field;
use App\Models\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function subscriber(): array
{
    return Subscriber::factory()->raw();
}

it('does not create a subscriber without missing fields', function () {
    $response = $this->postJson('/api/subscribers/upsert', []);
    $response->assertStatus(400);

    $response = $this->postJson('/api/subscribers/upsert', [
        'name' => '',
        'email' => '',
        'status' => 'Active'
    ]);
    $response->assertStatus(400);

    $response = $this->postJson('/api/subscribers/upsert', [
        'name' => '',
        'email' => 'test@test.test',
        'status' => 'Active'
    ]);
    $response->assertStatus(400);

    $response = $this->postJson('/api/subscribers/upsert', [
        'name' => 'Name',
        'email' => '',
        'status' => 'Active'
    ]);
    $response->assertStatus(400);
});

test('can create a subscriber')
    ->postJson('/api/subscribers/upsert', subscriber())
    ->assertStatus(200);


test('can create a subscriber with extra fields', function () {

    $response = $this->postJson('/api/subscribers/upsert', [
        'name' => 'Name',
        'email' => '',
        'status' => 'Active',
        'fields' => [
            field(),
            field(),
            field()
        ]
    ]);

    $response->assertStatus(400);
});
