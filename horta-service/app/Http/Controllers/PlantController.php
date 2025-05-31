<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlantRequest;
use App\Http\Requests\UpdatePlantRequest;
use App\Models\Plant;
use Illuminate\Http\Request;

class PlantController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $plants = Plant::where('user_id', $user['id'])->get();
        return response()->json(["data" => $plants], 200);
    }

    public function store(StorePlantRequest $request)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $data = $request->validated();
        $data['user_id'] = $user['id'];
        $plant = new Plant();
        $plant->fill($data);
        $plant->save();
        return response()->json(["data" => $plant], 200);
    }

    public function update(UpdatePlantRequest $request, Plant $plant)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $data = $request->validated();
        $data['user_id'] = $user['id'];
        $plant->fill($data);
        $plant->save();
        return response()->json(["data" => $plant], 200);
    }

    public function destroy(Request $request, Plant $plant)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $plant->delete();
        return response()->json(null, 204);
    }
}
