<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'state'
    ];

    public function fields(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Field::class, 'sub_id');
    }

    protected function state(): Attribute
    {
        return Attribute::make(
            get: static fn ($value) => match ($value) {
                1 => 'Active',
                2 => 'Unsubscribed',
                3 => 'Junk',
                4 => 'Bounced',
                default => 'Unconfirmed'
            },
            set: static fn ($value) => match ($value) {
                'Active' => 1,
                'Unsubscribed' => 2,
                'Junk' => 3,
                'Bounced' => 4,
                default => 5
            }
        );
    }
}
