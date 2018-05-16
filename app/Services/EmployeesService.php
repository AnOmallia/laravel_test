<?php

namespace App\Services;

use App\Models\Employee;
use File;

class EmployeesService
{
    /**
     * Get a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        return Employee::with('company')->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  array  $inputs
     * @return \Illuminate\Http\Response
     */
    public function create($inputs)
    {
        return Employee::create($inputs);
    }

    /**
     * Get the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function get($id)
    {
        return Employee::with('company')->whereId($id)->first();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @param  array  $inputs
     * @return \Illuminate\Http\Response
     */
    public function update($id, $inputs)
    {
    	return Employee::whereId($id)->first()->update($inputs);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function remove($id)
    {
    	return Employee::whereId($id)->first()->delete();
    }

}
