<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|unique:users,email|email',
            'password' => ['required', 'string', Password::min(8)->mixedCase()->numbers()],        
            ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            ]); 
        
        $token = $user->createToken('auth_token')->plainTextToken; // Generate a new token for the user

        return response()->json([
            'user' => $user,
            'token' => $token,
            ],201);
 }

    public function login(Request $request) {
        
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) { // Check if the user exists and if the password is correct
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken; // Generate a new token for the user

        // Return the user and token in the response
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete(); // Revoke the current access token for the user
        
        return response()->json([
            'message' => 'logged out successfully'
        ]);
    }
}
