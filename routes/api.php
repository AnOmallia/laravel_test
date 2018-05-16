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


Route::group(['middleware' => ['jwt.auth']], function () {
  
	Route::resource('companies', 'Api\CompaniesController');
	Route::resource('employees', 'Api\EmployeesController');
	Route::post('auth/logout', 'Api\AuthController@logOut');
});

Route::post('auth/login', 'Api\AuthController@login');
