<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request) {
        $tasks = Task::where('user_id', $request->user()->id)->get(); // Retrieve tasks for the authenticated user
        return response()->json($tasks);
    }

    public function store(Request $request)  {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|string',
            'category' => 'required|string',
            'energy_level' => 'required|string',
            'estimated_minutes' => 'required|integer|min:1',
            'due_date' => 'nullable|date',
        ]);

        $task = Task::create([
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'priority' => $validated['priority'],
            'category' => $validated['category'],
            'energy_level' => $validated['energy_level'],
            'estimated_minutes' => $validated['estimated_minutes'],
            'due_date' => $validated['due_date'] ?? null, // Set due_date to null if not provided
        ]);

        $task->refresh(); // Refresh the task instance to get the latest data from the database

        return response()->json([
           'message'=> 'Task created successfully',
           'task' => $task,],201);
    
}
}