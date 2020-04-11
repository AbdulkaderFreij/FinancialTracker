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

        $categories = Category::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $inputs = $request->toArray();
        $inputs['users_id'] = $request->user()->id;
        $category = Category::create($inputs);
        return response()->json(['message'=> 'category created',
        'category' => $category]);
    }

    public function show(Category $category)
    {
        return $category;
    }

    public function update(Request $request, Category $category)
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


