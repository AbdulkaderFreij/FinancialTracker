<?php


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::name('api.')->namespace('Api')->group(function () {
    // Unprotected routes
    Route::group(['middleware' => 'guest:api'], function () {
        Route::namespace('Auth')->group(function () {
            Route::post('login', 'LoginController')->name('login');
            Route::post('register', 'RegisterController')->name('register');
            Route::get('/currencies', 'CurrencyController@index')->name('currencies.all');

            // Password Reset Routes...
            Route::post('password/email', 'ForgotPasswordController@sendResetLinkEmail');
            Route::post('password/reset', 'ResetPasswordController@reset');
        });
    });

    // Protected routes
    Route::middleware('auth:api')->group(function () {
        Route::namespace('Auth')->group(function () {
            Route::get('me', 'MeController@me')->name('me');
            Route::post('logout', 'LogoutController@logout')->name('logout');

Route::get('/transactions', 'TransactionController@index')->name('transactions.all');
Route::post('/transactions', 'TransactionController@store')->name('transactions.store');
Route::get('/transactions/{transaction}', 'TransactionController@show')->name('transactions.show');
Route::put('/transactions/{transaction}', 'TransactionController@update')->name('transactions.update');
Route::delete('/transactions/{transaction}', 'TransactionController@destroy')->name('transactions.destroy');

Route::get('/categories', 'CategoryController@index')->name('categories.all');
Route::post('/categories', 'CategoryController@store')->name('categories.store');
Route::get('/categories/{category}', 'CategoryController@show')->name('categories.show');
Route::put('/categories/{category}', 'CategoryController@update')->name('categories.update');
Route::delete('/categories/{category}', 'CategoryController@destroy')->name('categories.destroy');
        });
    });
});
