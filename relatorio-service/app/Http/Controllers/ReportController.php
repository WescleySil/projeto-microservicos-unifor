<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $reports = Report::where('user_id', $user['id'])->get();
        return response()->json(["data" => $reports], 200);
    }

    public function store(StoreReportRequest $request)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $data = $request->validated();
        $data['user_id'] = $user['id'];
        $report = new Report();
        $report->fill($data);
        $report->save();
        return response()->json(["data" => $report], 200);
    }

    public function update(UpdateReportRequest $request, Report $report)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $data = $request->validated();
        $data['user_id'] = $user['id'];
        $report->fill($data);
        $report->save();
        return response()->json(["data" => $report], 200);
    }

    public function destroy(Request $request, Report $report)
    {
        $user = $request->get('auth_user') ?? null;
        if (!$user) {
            return response()->json();
        }
        $report->delete();
        return response()->json(null, 204);
    }
}
