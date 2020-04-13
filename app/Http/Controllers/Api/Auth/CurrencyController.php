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
    public function index() {
        $currencies = Currency::latest()->get();
        return $currencies;
    }


// We will need it to display the Currency in many places 
    public function show($id) {
        $currency = Currency::findOrFail($id); 
        return $currency;
    }

    public function create() {
        return 'submit by setting form here';
    }

//Create new currency
public function store(Request $request){
        $inputs = $request->only(['country', 'symbol','code']);
        $currency = new Currency();
        $currency->fill($inputs);
        $currency->save();
        return response()->json([
            "success" => true,
            "data" => null
        ], 200);
    }

   //Update We will need it when user  change  his Currency
  
  public function update(Request $request,$id){
    if($request->isMethod('post')){
      $currencie= Currency::find($id);
      $currencie->country = $request->input('country');
      $currencie->symbol = $request->input('symbol');
      $currencie->code = $request->input('code');
      $currencie->save();
      return response()->json([
                "success" => true,
                "data" => null
            ], 200);    }
    else{
        return response()->json([
            "success" => false,
            "data" => null
        ], 400);    }
    }

 //maybe we will not use it Because user just need to update his currency not delete 
 public function destroy($id) {
    $currencie = Currency::findOrFail($id);
    $currencie->delete();
    return 'deleting was successful';
}
}