<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Note extends Model
{
    use softDeletes;

    protected $fillable = [
        'title',
        'note',
        'user_id',
    ];
}
