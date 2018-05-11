<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use File;

class EmployeesService
{

    public function getAllEmployees(){
        return Employee::paginate(10);
    }

    public function createEmployee($inputs){
        return Employee::create($inputs);
    }

    public function getEmployee($id)
    {
        return Employee::whereId($id)->first();
    }

    public function updateEmployee($id, $inputs){
    	return Employee::whereId($id)->first()->update($inputs);
    }

    public function removeEmployee($id){
    	return Employee::whereId($id)->first()->delete();
    }

}
