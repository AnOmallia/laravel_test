<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeeRequest;
use App\Services\EmployeesService;
use App\Services\CompaniesService;


class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Services\EmployeesService  $employeesService
     * @return \Illuminate\Http\Response
     */
    public function index(EmployeesService $employeesService)
    {
        $employees = $employeesService->getAll();
        return view('employees.index', ['employees' => $employees]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \App\Services\CompaniesService  $companiesService
     * @return \Illuminate\Http\Response
     */
    public function create(CompaniesService $companiesService)
    {
        $companies = $companiesService->getAll();
        return view('employees.create', ['companies' => $companies]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Requests\EmployeeRequest  $request
     * @param  \App\Services\EmployeesService  $employeesService
     * @return \Illuminate\Http\Response
     */
    public function store(EmployeeRequest $request, EmployeesService $employeesService)
    {
        $input = $request->inputs();
        $employee = $employeesService->create($input);
        return redirect('employees/' . $employee->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @param  \App\Services\EmployeesService  $employeesService
     * @return \Illuminate\Http\Response
     */
    public function show($id, EmployeesService $employeesService)
    {
        $employee = $employeesService->get($id);
        return view('employees.show', ['employee' => $employee]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @param  \App\Services\EmployeesService  $employeesService
     * @param  \App\Services\EmployeesService  $companiesService
     * @return \Illuminate\Http\Response
     */
    public function edit($id, EmployeesService $employeesService, CompaniesService $companiesService)
    {
        $employee = $employeesService->get($id);
        $companies = $companiesService->getAll();
        return view('employees.edit', ['employee' => $employee, 'companies' => $companies]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Requests\EmployeeRequest  $request
     * @param  \App\Services\EmployeesService  $employeesService
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EmployeeRequest $request, $id, EmployeesService $employeesService)
    {
        $inputs = $request->inputs();
        $companies = $employeesService->update($id, $inputs);
        return redirect('employees/' . $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @param  \App\Services\EmployeesService  $employeesService
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, EmployeesService $employeesService)
    {
        $employee = $employeesService->remove($id);
        return redirect('employees');
    }
}
