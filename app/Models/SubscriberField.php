<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SubscriberField extends Model
{
    protected $fillable = [
        'subscriber_id', 'field_id', 'value'
    ];

    protected $hidden = [
        'created_at', 'updated_at', 'subscriber_id', 'id'
    ];

    protected $appends = ['title'];

    public function field(): HasOne
    {
        return $this->hasOne(Field::class, 'id', 'field_id');
    }

    public function subscriber(): HasOne
    {
        return $this->hasOne(Subscriber::class, 'id', 'subscriber_id');
    }

    public function getTitleAttribute() {
        return $this->field?->title;
    }
}
