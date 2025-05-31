<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Garden extends Model
{
    protected $fillable = [
        'name',
        'description',
        'planting_date',
        'user_id'
    ];
}
