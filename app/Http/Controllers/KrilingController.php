<?php

namespace App\Http\Controllers;
use App\Models\Kriling;

use Illuminate\Http\Request;

class KrilingController extends Controller
{
    public function index()
    {
        return view('portafolioKriling.index');
    }
}
