<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CampaignController extends Controller
{
    public function index()
    {
        return Campaign::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'from' => 'required|date',
            'to' => 'required|date|after:from',
            'total_budget' => 'required|numeric',
            'daily_budget' => 'required|numeric',
            'creatives' => 'nullable|array',
            'creatives.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $creatives = [];
        if ($request->hasFile('creatives')) {
            foreach ($request->file('creatives') as $file) {
                $path = $file->store('creatives', 'public');
                $creatives[] = $path;
            }
        }

        $campaign = Campaign::create([
            'name' => $request->name,
            'from' => $request->from,
            'to' => $request->to,
            'total_budget' => $request->total_budget,
            'daily_budget' => $request->daily_budget,
            'creatives' => json_encode($creatives),
        ]);

        return response()->json($campaign, 201);
    }
}
