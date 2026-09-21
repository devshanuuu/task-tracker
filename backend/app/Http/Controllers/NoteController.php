<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;

class NoteController extends Controller
{
    
    // Display a listing of the notes for the authenticated user.
    public function index(Request $request) {
        $notes = Note::where('user_id', $request->user()->id)->get();
        return response()->json($notes);
    }

    // Store a newly created note in the database.
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'category' => 'required|string',
            ]);

        $note = Note::create([
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category' => $validated['category'] 
        ]);

        $note->refresh(); 
        
        return response()->json([
            'message' => 'Note created successfully',
            'note' => $note,
        ],201);
    }

    // Update the specified note in the database.
    public function update(Request $request, $id) {
        $note = Note::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'category' => 'required|string',
        ]);

        $note->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category' => $validated['category'],
        ]);

        return response()->json([
            'message' => 'Note updated successfully',
            'note' => $note,
        ]);
    }

    // Remove the specified note from the database.
    public function destroy(Request $request, $id) {
        $note = Note::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();

        $note->delete();

        return response()->json([
             'message' => 'Note deleted successfully',
        ]);
    }

    // Toggle the pin status of the specified note.
    public function togglePin(Request $request, $id) {
        $note = Note::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();

        $note->update([
            'is_pinned' => !$note->is_pinned,
        ]);

        return response()->json([
            'message' => 'Note pin status toggled successfully',
            'note' => $note,
        ]);
    }
}
