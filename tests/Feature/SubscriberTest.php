<?php

use App\Models\Subscriber;

it('does not create a subscriber without missing fields', function () {
    $response = $this->postJson('/api/subscriber', []);
    $response->assertStatus(422);

    $response = $this->postJson('/api/subscriber', [
        'name' => '',
        'email' => 'test@gmail.com',
        'state' => 'Active'
    ]);
    $response->assertStatus(422);

    $response = $this->postJson('/api/subscriber', [
        'name' => 'Name',
        'email' => '',
        'state' => 'Active'
    ]);
    $response->assertStatus(422);

    $response = $this->postJson('/api/subscriber', [
        'name' => 'Name',
        'email' => 'test@gmail.com',
        'state' => ''
    ]);
    $response->assertStatus(422);
});

it('it will not create a subscriber with invalid email', function () {
    $response = $this->postJson('/api/subscriber', [
        'name' => 'Test',
        'email' => 'test@test.test',
        'state' => 'Active'
    ]);
    $response->assertStatus(422);
});

it('it will edit a subscriber', function () {
    $subscriber = Subscriber::factory()->create();
    $response = $this->patch('/api/subscriber/'.$subscriber->id, [
        'name' => 'new name',
        'willitskipthis' => 1
    ]);
    expect(Subscriber::find($subscriber->id)->name)->toBe('new name')
        ->and(Subscriber::find($subscriber->id)->email)->toBe($subscriber->email);
    $response->assertStatus(200);
});

it('it will delete a subscriber', function () {
    $subscriber = Subscriber::factory()->create();
    $response = $this->delete('/api/subscriber/'.$subscriber->id);
    expect(Subscriber::find($subscriber->id))->toBeNull();
    $response->assertStatus(200);
});
