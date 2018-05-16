<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeeRequest;
use App\Http\Controllers\Controller;
use App\Services\EmployeesService;
use App\Services\CompaniesService;


class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(EmployeesService $employeesService)
    {
        $employees = $employeesService->getAll();
        return response()->json($employees);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EmployeeRequest $request, EmployeesService $employeesService)
    {
        $input = $request->inputs();
        $employee = $employeesService->create($input);
        return response()->json($employee, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, EmployeesService $employeesService, CompaniesService $companiesService)
    {
        $employee = $employeesService->get($id);
        $companies = $companiesService->getAll();
        return response()->json($employee);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EmployeeRequest $request, $id, EmployeesService $employeesService)
    {
        $inputs = $request->inputs();
        $companies = $employeesService->update($id, $inputs);
        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, EmployeesService $employeesService)
    {
        $employee = $employeesService->remove($id);
        return response()->json(null, 204);
    }

    // public function getCompanies(CompaniesService $companiesService)
    // {
    //     $companies = $companiesService->getAllCompaniesNamesArray();
    //     return response()->json($companies);
    // }
}
