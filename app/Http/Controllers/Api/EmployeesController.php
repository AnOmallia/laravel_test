<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeesRequest;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Company;
use File;


class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employee::with('companies')->get();
        return response()->json($employees);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EmployeesRequest $request)
    {
        $input = $request->all();
        unset($input['_token']);
        $employee = Employee::create($input);
        if($employee){
            return response()->json($employee->id);
        }
        return response()->json($employee->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee = Employee::with('companies')->whereId($id)->first();
        return response()->json($employee);
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
        $input = $request->all();
        unset($input['_method']);
        unset($input['_token']);
        $employee = Employee::whereId($id)->update($input);
        if ($employee) {
            return response()->json($employee);
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
        $employee = Employee::whereId($id)->delete();
        return response()->json($id);
    }

    public function getCompanies()
    {
        $companies = Company::select("name", "id")->get();
        return response()->json($companies);
    }
}
