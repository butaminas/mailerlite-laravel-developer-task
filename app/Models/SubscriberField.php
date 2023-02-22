<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SubscriberField extends Model
{
    use HasFactory;

    protected $fillable = [
        'subscriber_id', 'field_id'
    ];

    protected $hidden = [
        'subscriber_id', 'field_id', 'created_at', 'updated_at'
    ];

    public function field(): HasOne
    {
        return $this->hasOne(Field::class);
    }

    public function subscriber(): HasOne
    {
        return $this->hasOne(Subscriber::class);
    }
}
