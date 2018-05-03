<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Company;
//use Illuminate\Support\Facades\Auth;
use Auth;

class WelcomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $is_auth = Auth::user();
    	//dd($is_auth);
        // dd(Company::all());
        return response()->json($is_auth);
    }
}

// if (Auth::check()) {
//     // The user is logged in...
// }
