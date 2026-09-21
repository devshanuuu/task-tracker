<?php

namespace App\Models;

use App\Models\User;
use App\Models\Note;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function notes() {
        return $this->belongsToMany(Note::class);
    }

    // The attributes that can be mass assigned when creating or updating a task.
    protected $fillable = [
    'user_id',
    'title',
    'description',
    'status',
    'priority',
    'category',
    'energy_level',
    'estimated_minutes',
    'due_date',
];                                   

    // The attributes that should be cast to native types.
    protected $casts = [
        'due_date' => 'date', 
    ];
}
