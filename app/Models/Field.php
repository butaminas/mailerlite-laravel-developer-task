<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'type'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    protected $appends = ['value'];

    protected function type(): Attribute
    {
        return Attribute::make(
            get: static fn ($value) => match ((int) $value) {
                1 => 'date',
                2 => 'number',
                3 => 'boolean',
                default => 'string'
            },
            set: static fn ($value) => match (strtolower($value)) {
                'date' => 1,
                'number' => 2,
                'boolean' => 3,
                default => 4
            }
        );
    }

    // We need empty value field for making select field placeholder
    public function getValueAttribute(): string
    {
        return '';
    }
}
