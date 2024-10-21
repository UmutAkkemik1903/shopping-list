<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListModel extends Model
{
    protected $table = "shopping_list";

    protected $fillable = [
        'name',
        'created_by',
        'created_at',
        'deleted_at'
    ];
}
