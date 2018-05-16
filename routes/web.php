<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');

Route::middleware(['auth', 'admin'])->group(function () {
	Route::post('logout', 'Auth\LoginController@logout')->name('logout');

	Route::get('home', 'HomeController@index')->name('home');
	Route::resource('companies', 'CompaniesController');
	Route::resource('employees', 'EmployeesController');
});

Route::get('app', function () {
    return view('react.index');
});