<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CompaniesRequest;
use App\Company;
use File;

class CompaniesController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::paginate(10);
        return view('companies.index', ['companies' => $companies]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('companies.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CompaniesRequest $request)
    {
        $input = $request->all();
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
                $company = Company::create($input);
                return redirect('company/' . $company->id);
            }
            return redirect()->back();
        } else {
            $company = Company::create($input);
            return redirect('company/' . $company->id);
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
        $company = Company::whereId($id)->first();
        return view('companies.show', ['company' => $company]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $company = Company::whereId($id)->first();
        return view('companies.edit', ['company' => $company]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CompaniesRequest $request, $id)
    {
        $input = $request->all();
        unset($input['_method']);
        unset($input['_token']);
        $company = Company::whereId($id)->first();
        if ($request->logo) {
            $path = '../storage/app/public/logos';
            if (!file_exists($path)) {
                File::makeDirectory($path);
            }

            if($company->logo) {
                File::delete($path."/".$company->logo);
            }
            $imageName = time().'.'.$request->logo->getClientOriginalExtension();
            $success = $request->logo->move($path, $imageName);
            if ($success) {
                $input['logo'] = $imageName;
                $company = Company::find($id)->update($input);
                return redirect('company/' . $id);
            }
            return redirect()->back();
        } else {
            $company = Company::find($id)->update($input);
            return redirect('company/' . $id);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = Company::find($id);
        if ($company->logo) {
            $path = '../storage/app/public/logos';
            File::delete($path."/".$company->logo);
        }
        $company->delete();
        return redirect('company');
    }
}
