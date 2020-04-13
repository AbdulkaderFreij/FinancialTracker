<?php

namespace App\Http\Controllers\Api\Auth;

use App\Transaction;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TransactionController extends Controller
{

    public function index()
    {
        error_log('Some message here.'); //? i was testing what is auth()->user()->id ok this should work
        $transaction = Transaction::where(["users_id"=>auth()->user()->id])->with('category','currency')->get();        
        error_log($transaction);
        return response()->json($transaction);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'amount' => 'required',
            'description' => 'required',
            'start_date' => 'required',
            'end_date' => '',
            'interval' => '',
            'type' => 'required',
            'currencies_id' => 'required',
            'categories_id'=>'required'
        ]);
        $inputs = $request->toArray();
        $inputs['users_id'] = $request->user()->id;
        $transaction = Transaction::create($inputs);
        return response()->json(['message'=> 'transaction created',
        'transaction' => $transaction]);
      //  return $request->all();
    }

    public function show(Transaction $transaction)
    {
        return $transaction;
    }

    public function update(Request $request, Transaction $transaction)
    {
        $request->validate([
            'title' => 'required',
            'amount' => 'required',
            'description' => 'required',
            'start_date' => 'required',
            'end_date' => '',
            'interval' => '',
            'type' => 'required',
        ]);
       $transaction->update($request->all());

        return response()->json([
            'message' => 'transaction updated!',
            'transaction' => $transaction
        ]);
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return response()->json([
            'message' => 'transaction deleted'
        ]);

    }
}


