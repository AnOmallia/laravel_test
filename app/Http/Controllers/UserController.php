<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use App\User;
use JWTAuth;
use JWTAuthException;

class UserController extends Controller
{
    public function login(AuthRequest $request)
    {
        $user = \App\User::where('email', $request->email)->get()->first();

        if ($user && \Hash::check($request->password, $user->password)){
            $token = null;
	        try {
	            if (!$token = JWTAuth::attempt( ['email'=>$request->email, 'password'=>$request->password])) {
	                return response()->json([
	                    'response' => 'error',
	                    'message' => 'Password or email is invalid',
	                    'token'=>$token
	                ]);
	            }
	        } catch (JWTAuthException $e) {
	            return response()->json([
	                'response' => 'error',
	                'message' => 'Token creation failed',
	            ]);
	        }

            $user->token = $token;
            $user->save();
            $response = ['success'=>true, 'data'=>['token'=>$user->token]];           
        } else 
          $response = ['success'=>false, 'data'=>'Record doesnt exists'];
      
        return response()->json($response, 201);
    }
}
