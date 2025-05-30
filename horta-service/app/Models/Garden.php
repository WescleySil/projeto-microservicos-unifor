<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Garden extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'planting_date',
        'user_id'
    ];
}
