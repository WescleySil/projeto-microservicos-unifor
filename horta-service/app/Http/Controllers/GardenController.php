<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGardenRequest;
use App\Models\Garden;
use Illuminate\Http\Request;

class GardenController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $gardens = Garden::where('user_id', $user['id'])->get();
        return response()->json(["data" => $gardens], 200);
    }

    public function store(StoreGardenRequest $request)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $data = $request->validated();
        $data['user_id'] = $user['id'];
        $garden = new Garden();
        $garden->fill($data);
        $garden->save();
        return response()->json(["data" => $garden], 200);
    }
}
