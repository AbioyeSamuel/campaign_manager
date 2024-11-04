<?php

use App\Http\Controllers\CampaignController;

Route::get('/campaigns', [CampaignController::class, 'index']);
Route::post('/campaigns', [CampaignController::class, 'store']);
Route::put('/campaigns/{id}', [CampaignController::class, 'update']);
Route::delete('/campaigns/{id}', [CampaignController::class, 'destroy']);

