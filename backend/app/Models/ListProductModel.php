<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListProductModel extends Model
{
    protected $table = "list_product";

    protected $fillable = [
        'list_id',
        'product_id',
        'quantity',
        'product_id',
        'created_at',
        'updated_at',
        'deleted_at'
    ];
}
