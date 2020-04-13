<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {

        $categories = Category::where('users_id', auth()->user()->id)->get();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $inputs = $request->toArray();
        $inputs['users_id'] = auth()->user()->id;
        $category = Category::create($inputs);
        return response()->json(['message'=> 'category created',
        'category' => $category]);
    }

    public function show($id)
    {
        $category = Category::where('id', $id)->first();
        return $category; //Hmmmmm alright whats the best way
    }

    public function update(Request $request, Category $category) //you can do it here too if you wnat
    {
        $request->validate([
            'name' => 'required',
        ]);
       $category->update($request->all());

        return response()->json([
            'message' => 'category updated!',
            'category' => $category
        ]);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([
            'message' => 'category deleted'
        ]);

    }
}


