<?php

namespace App\Http\Controllers;
use App\Models\Manuel;

use Illuminate\Http\Request;

class ManuelController extends Controller
{
    public function index()
    {
        return view('portafolioManuel.index');
    }
}
