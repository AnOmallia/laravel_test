<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\User;
use JWTAuth;
use JWTAuthException;

class AuthController extends Controller {

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->get()->first();

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

    public function logOut(Request $request) 
    {
    	$user = User::where('token', $request->token)->update(['token' => null]);
    	if($user){
    		$response = $user ? ['success'=>true, 'data'=>'You are successfully logged out'] : ['success'=>false, 'data'=>'Some error occured'];
    		return response()->json($response);
    	}
    }
}