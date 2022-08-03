<?php

namespace App\Http\Controllers;
use App\Models\David;

use Illuminate\Http\Request;

class DavidController extends Controller
{
    public function index()
    {
        return view('portafolioDavid.index');
    }
}
