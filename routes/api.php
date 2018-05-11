<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// 	Route::get('welcome', 'Api\WelcomeController@index');
// });



Route::group(['middleware' => ['jwt.auth']], function () {
  
	Route::resource('companies', 'Api\CompaniesController');
	Route::resource('employees', 'Api\EmployeesController');
	// Route::post('update/{id}', 'Api\CompaniesController@update');
	// Route::post('employees/update/{id}', 'Api\EmployeesController@update');
	Route::get('getcompanies', 'Api\EmployeesController@getCompanies');
	Route::post('user/logout', 'Api\UserController@logOut');
});

Route::post('user/login', 'Api\UserController@login');
