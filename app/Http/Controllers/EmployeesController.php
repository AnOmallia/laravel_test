<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EmployeesRequest;
use App\Models\Employee;
use App\Models\Company;

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
    public function index()
    {
        $employees = Employee::with('companies')->paginate(10);
        return view('employees.index', ['employees' => $employees]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $companies = Company::select('name', 'id')->get()->pluck('name', 'id')
            ->toArray();
        return view('employees.create', ['companies' => $companies]);
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
            return redirect('employee/' . $employee->id);
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
        $employee = Employee::with('companies')->whereId($id)->first();
        return view('employees.show', ['employee' => $employee]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $employee = Employee::with('companies')->whereId($id)->first();
        $companies = Company::select('name', 'id')->get()
            ->pluck('name', 'id')->toArray();
        return view('employees.edit', [
            'employee' => $employee, 'companies' => $companies
            ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EmployeesRequest $request, $id)
    {
        $input = $request->all();
        unset($input['_method']);
        unset($input['_token']);
        $employee = Employee::whereId($id)->update($input);
        if ($employee) {
            return redirect('employee/' . $id);
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
        $employee = Employee::find($id)->delete();
        if ($employee) {
            return redirect('employee');
        }
    }
}
