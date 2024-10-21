<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FunctionController extends Controller
{
    public $nowDate;
    public function __construct()
    {
        $this->nowDate = date('Y-m-d H:i:s');
    }
}
