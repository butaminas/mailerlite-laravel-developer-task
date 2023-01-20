<?php
use App\Models\Subscriber;
use App\Models\Field;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function field(): array
{
    return Field::factory()->raw();
}

test('can create a field', function () {
    $subscriber = Subscriber::create(subscriber());
    $field_data = field();
    $field_data['sub_id'] = $subscriber->id;
    $field = Field::create($field_data);

    expect($field)->toBeInstanceOf(Field::class);
});
