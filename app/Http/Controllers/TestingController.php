<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TestingController extends Controller
{
    public function workbench()
    {
        return Inertia::render("Testing/Workbench");
    }
}
