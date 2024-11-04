<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        // Handle preflight requests
        if ($request->getMethod() === 'OPTIONS') {
            return response()->json([], 200);
        }

        return [
            'paths' => ['api/*', 'campaigns', 'sanctum/csrf-cookie'],
            'allowed_methods' => ['*'],
            'allowed_origins' => ['http://localhost:3000'],
            'allowed_headers' => ['*'],
            'exposed_headers' => [],
            'max_age' => 0,
            'supports_credentials' => true,
        ];
        
    }
}
