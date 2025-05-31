<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plant extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'plant_type',
        'planting_date',
        'user_id',
    ];
}
