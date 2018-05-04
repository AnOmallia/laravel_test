<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Company;
use File;


class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::all();
        return response()->json($companies);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'logo' => 'mimes:jpeg,png,jpg,svg|dimensions:min_width=100,min_height=100',
        ]);
        $input = $request->all();
        //dd($input);
        unset($input['_token']);
        if($request->logo){
            $path = '../storage/app/public/logos';
            if (!file_exists($path)) {
                File::makeDirectory($path);
            }

            $imageName = time().'.'.$request->logo->getClientOriginalExtension();
            $success = $request->logo->move($path, $imageName);
            if ($success) {
                $input['logo'] = $imageName;
                $company = Company::create($company->id);
                //return redirect('company/' . $company->id);
                return response()->json($company);
            }
            return response()->json(0);
        } else {
            $company = Company::create($input);
            return response()->json($company->id);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
