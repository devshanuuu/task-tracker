<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use aoo\Models\Tasks;

class TaskController extends Controller
{
    public function index() {
        $tasks = Task::all();
        return response()->json($tasks);
    }
}
