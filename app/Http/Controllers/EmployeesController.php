<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeeRequest;
use App\Http\Controllers\EmployeesService;
use App\Http\Controllers\CompaniesService;

class EmployeesController extends Controller
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
    public function index(EmployeesService $employeesService)
    {
        $employees = $employeesService->getAllEmployees();
        return view('employees.index', ['employees' => $employees]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(CompaniesService $companiesService)
    {
        $companies = $companiesService->getAllCompaniesNamesArray();
        return view('employees.create', ['companies' => $companies]);
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
        $employee = $employeesService->createEmployee($input);
        return redirect('employees/' . $employee->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, EmployeesService $employeesService)
    {
        $employee = $employeesService->getEmployee($id);
        return view('employees.show', ['employee' => $employee]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, EmployeesService $employeesService, CompaniesService $companiesService)
    {
        $employee = $employeesService->getEmployee($id);
        $companies = $companiesService->getAllCompaniesNamesArray();
        return view('employees.edit', ['employee' => $employee, 'companies' => $companies]);
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
        $companies = $employeesService->updateEmployee($id, $inputs);
        return redirect('employees/' . $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, EmployeesService $employeesService)
    {
        $employee = $employeesService->removeEmployee($id);
        return redirect('employees');
    }
}
