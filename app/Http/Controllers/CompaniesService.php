<?php

namespace App\Http\Controllers;


use App\Models\Company;
use File;

class CompaniesService
{

    public function getAllCompanies(){
        return Company::paginate(10);
    }

    public function createCompany($inputs, $logo){
        $path = storage_path('app/public/logos');
        if (!file_exists($path)) {
            File::makeDirectory($path);
        }

        $imageName = time().'.'.$inputs['logo']->getClientOriginalExtension();
        $inputs['logo']->move($path, $imageName);
        $inputs['logo'] = $imageName;
        return Company::create($inputs);
    }

    public function getCompany($id)
    {
        return Company::whereId($id)->first();
    }

    public function updateCompany($id, $inputs, $logo){
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

    public function removeCompany($id){
    	$company = Company::whereId($id)->first();
        $path = storage_path('app/public/logos');
        File::delete($path."/".$company->logo);
        return $company->delete();
    }

    public function getAllCompaniesNamesArray(){
        return Company::select('name', 'id')->get();
    }

}
