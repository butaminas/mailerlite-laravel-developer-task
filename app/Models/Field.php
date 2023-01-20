<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    use HasFactory;

    protected $fillable = [
        'sub_id', 'title', 'type', 'value'
    ];

    protected function type(): Attribute
    {
        return Attribute::make(
            get: static fn ($value) => match ($value) {
                1 => 'Date',
                2 => 'Number',
                3 => 'Boolean',
                default => 'String'
            },
            set: static fn ($value) => match ($value) {
                'Date' => 1,
                'Number' => 2,
                'Boolean' => 3,
                default => 'String'
            }
        );
    }
}
