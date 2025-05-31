<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
    protected $fillable = [
        'name',
        'plant_type',
        'plant_date',
        'user_id',
    ];
}
