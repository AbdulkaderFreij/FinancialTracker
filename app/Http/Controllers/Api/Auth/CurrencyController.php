<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

use App\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{

    public function index()
    {
        $currencies = Currency::all();
        return response()->json($currencies);
    }

    public function store(Request $request)
    {
        $request->validate([
            'symbol' => 'required',
            'code' => '',
            'country' => ''
        ]);
        $inputs = $request->toArray();
        $inputs['users_id'] = $request->user()->id;
        $currency = Currency::create($inputs);
        return response()->json(['message'=> 'category created',
        'category' => $currency]);
    }

}

