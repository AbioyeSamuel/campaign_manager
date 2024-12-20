<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class CampaignController extends Controller
{
    public function index()
    {
        $campaigns = Cache::remember('campaigns', 60, function () {
            return Campaign::all();
        });

        return response()->json($campaigns);
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
            'creatives.*' => 'file|mimes:jpeg,png,jpg,gif|max:2048',
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
            'creatives' => $creatives,
        ]);

        Cache::forget('campaigns'); // Clear the cache

        return response()->json($campaign, 201);
    }

    public function update(Request $request, $id)
    {
        $campaign = Campaign::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'from' => 'required|date',
            'to' => 'required|date|after:from',
            'total_budget' => 'required|numeric',
            'daily_budget' => 'required|numeric',
            'creatives' => 'nullable|array',
            'creatives.*' => 'file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $creatives = $campaign->creatives ?? [];
        if ($request->hasFile('creatives')) {
            foreach ($request->file('creatives') as $file) {
                $path = $file->store('creatives', 'public');
                $creatives[] = $path;
            }
        }

        $campaign->update([
            'name' => $request->name,
            'from' => $request->from,
            'to' => $request->to,
            'total_budget' => $request->total_budget,
            'daily_budget' => $request->daily_budget,
            'creatives' => $creatives,
        ]);

        Cache::forget('campaigns'); 

        return response()->json($campaign);
    }

    public function destroy($id)
    {
        $campaign = Campaign::findOrFail($id);
        $campaign->delete();

        Cache::forget('campaigns'); 

        return response()->json(['message' => 'Campaign deleted successfully']);
    }
}
