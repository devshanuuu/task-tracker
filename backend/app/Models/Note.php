<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Note extends Model
{
    public function user() {
        return $this->belongsTo(User::class); // Define the relationship with the User model
    }

    public function tasks() {
        return $this->belongsToMany(Task::class);
    }

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'category',
        'is_pinned',
    ];

    protected $casts = [
    'is_pinned' => 'boolean',
    ];
}
