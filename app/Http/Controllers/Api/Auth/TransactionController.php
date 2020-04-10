<?php

namespace App\Http\Controllers\Api\Auth;

use App\Transaction;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TransactionController extends Controller
{

    public function index()
    {
        $transactions = Transaction::all();
        return response()->json($transactions);
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


