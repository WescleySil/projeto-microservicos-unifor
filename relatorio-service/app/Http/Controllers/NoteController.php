<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $notes = Note::where('user_id', $user['id'])->get();
        return response()->json(["data" => $notes], 200);
    }

    public function store(StoreNoteRequest $request)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $data = $request->validated();
        $data['user_id'] = $user['id'];
        $note = new Note();
        $note->fill($data);
        $note->save();
        return response()->json(["data" => $note], 200);
    }

    public function update(UpdateNoteRequest $request, Note $note)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $data = $request->validated();
        $data['user_id'] = $user['id'];
        $note->fill($data);
        $note->save();
        return response()->json(["data" => $note], 200);
    }

    public function destroy(Request $request, Note $note)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $note->delete();
        return response()->json(null, 204);
    }
}
