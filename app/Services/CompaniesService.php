<?php

namespace App\Services;

use App\Models\Company;
use File;


class CompaniesService
{
    /**
     * Get a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        return Company::paginate(10);
    }

    /**
     * Store a newly created resource in storage andmovefile.
     *
     * @param  array  $inputs
     * @param  file  $logo
     * @return \Illuminate\Http\Response
     */
    public function create($inputs, $logo){
        $path = storage_path('app/public/logos');
        if (!file_exists($path)) {
            File::makeDirectory($path);
        }

        $imageName = time().'.'.$inputs['logo']->getClientOriginalExtension();
        $inputs['logo']->move($path, $imageName);
        $inputs['logo'] = $imageName;
        return Company::create($inputs);
    }

    /**
     * Get the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function get($id)
    {
        return Company::whereId($id)->first();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @param  array  $inputs
     * @param  file  $logo
     * @return \Illuminate\Http\Response
     */
    public function update($id, $inputs, $logo)
    {
    	$company = Company::whereId($id)->first();
    	if($logo){
	        $path = storage_path('app/public/logos');
	        File::delete($path."/".$company->logo);
	        $imageName = time().'.'.$inputs['logo']->getClientOriginalExtension();
	        $inputs['logo']->move($path, $imageName);
	        $inputs['logo'] = $imageName;
	    }
        return $company->update($inputs);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function remove($id)
    {
    	$company = Company::whereId($id)->first();
        $path = storage_path('app/public/logos');
        File::delete($path."/".$company->logo);
        return $company->delete();
    }
}
