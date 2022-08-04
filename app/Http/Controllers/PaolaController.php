<?php

namespace App\Http\Controllers;
use App\Models\Paola;

use Illuminate\Http\Request;

class PaolaController extends Controller
{
    public function index()
    {
        return view('portafolioPaola.index');
    }
}
