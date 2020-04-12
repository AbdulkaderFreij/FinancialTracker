<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

use App\Currency;
use Illuminate\Http\Request;
class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $currencies = Currency::all();
      if (!$currencies) {
        return response()->json([
            'status'=>'failed',
            'message' => 'No currencies found!'
        ], 500);
      }
      return response()->json([
          'status'=>'success',
          'currencies' => $currencies
      ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $inputs = $request->all();
        
        $currency = new Currency();
        $currency->fill($inputs);
        $currency->save();

        return response()->json([
            'status' => 'success',
            'currency' => $currency
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $currency = Currency::where('id', $id)->first();

        if (!$currency) {
            return response()->json([
                'status'=>'failed',
                'message' => 'Curreny not found!'
            ], 500);
        }
        
        return response()->json([
          'status' => 'success',
          'currency' => $currency
      ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $inputs = $request->all();
        
        $currency = Currency::where('id', $id)->first();

        // $task -> name = $inputs['name'];
        // $task -> description = $inputs['description'];
        $currency -> update($inputs);
        $currency -> save();

        return response()->json([
            'status' => 'success',
            'currency' => $currency
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $currency = Currency::where('id', $id)->delete();

        return response()->json([
            'status' => 'success'
        ], 201);
    }
}