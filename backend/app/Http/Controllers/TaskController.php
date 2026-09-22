<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Note;

class TaskController extends Controller
{
    // Display a listing of the tasks for the authenticated user.
    public function index(Request $request) {
        $tasks = Task::where('user_id', $request->user()->id)->get(); // Retrieve tasks for the authenticated user
        return response()->json($tasks);
    }

    // Display the specified task for the authenticated user.
    public function show(Request $request, $id) {
        $task = Task::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        return response()->json($task);
    }

    // Store a newly created task in the database.
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

    // Update the specified task in the database.
    public function update(Request $request, $id) {
        $task = Task::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail(); // Ensure the task belongs to the authenticated user

        $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'priority' => 'required|string',
        'category' => 'required|string',
        'energy_level' => 'required|string',
        'estimated_minutes' => 'required|integer|min:1',
        'due_date' => 'nullable|date',
    ]);

    $task->update([
        'title' => $validated['title'],
        'description' => $validated['description'] ?? null,
        'priority' => $validated['priority'],
        'category' => $validated['category'],
        'energy_level' => $validated['energy_level'],
        'estimated_minutes' => $validated['estimated_minutes'],
        'due_date' => $validated['due_date'] ?? null,
    ]);

    return response()->json([
        'message' => 'Task updated successfully',
        'task' => $task,
    ]);
    }

    // Remove the specified task from the database.
    public function destroy(Request $request, $id) {
        $task = Task::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail(); // Ensure the task belongs to the authenticated user

        $task->delete();

        return response()->json([
          'message' => 'Task deleted successfully',
        ]);
    }

    // Update the status of the specified task in the database.
    public function updateStatus(Request $request, $id)
    {
    $task = Task::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();

    $validated = $request->validate([
        'status' => 'required|in:pending,in_progress,completed',
        ]);

    $task->update([
        'status' => $validated['status'],
        ]);

    return response()->json([
        'message' => 'Task status updated successfully',
        'task' => $task,
        ]);
    }


    // List all notes attached to the specified task.
    public function notes(Request $request, $id) {
        $task = Task::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();

        $notes = $task->notes()->get(); // Retrieve all notes attached to the task by relationship in notes().

        return response()->json($notes);
    }

    // Attach a note to the specified task.
    public function attachNote(Request $request, $id) {
    $task = Task::where('id', $id)
        ->where('user_id', $request->user()->id)
        ->firstOrFail();

    $validated = $request->validate([
        'note_id' => 'required|integer|exists:notes,id',
        ]);

    $note = Note::where('id', $validated['note_id'])
        ->where('user_id', $request->user()->id)
        ->firstOrFail();

    $task->notes()->syncWithoutDetaching($note->id); // Attach the note to the task without detaching existing notes

    return response()->json([
        'message' => 'Note attached to task successfully',
       ]);
    }    

    // Detach a note from the specified task.
    public function detachNote(Request $request, $id, $noteId) {
        $task = Task::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();

        $task->notes()->detach($noteId);

        return response()->json([
        'message' => 'Note detached from task successfully',
      ]);
    }

}