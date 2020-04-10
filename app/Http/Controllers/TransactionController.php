<?php

namespace App\Http\Controllers;

use App\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

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
        ]);
        $transaction = Transaction::create($request->all());
        return response()->json(['message'=> 'transaction created',
        'transaction' => $transaction]);
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


