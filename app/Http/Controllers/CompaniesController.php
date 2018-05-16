<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CompanyRequest;
use App\Services\CompaniesService;


class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Services\CompaniesService  $companiesService
     * @return \Illuminate\Http\Response
     */
    public function index(CompaniesService $companiesService)
    {
        $companies = $companiesService->getAll();
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
     * @param  \Illuminate\Http\Requests\CompanyRequest  $request
     * @param  \App\Services\CompaniesService  $companiesService
     * @return \Illuminate\Http\Response
     */
    public function store(CompanyRequest $request, CompaniesService $companiesService)
    {
        $inputs = $request->inputs();
        $company = $companiesService->create($inputs, $request->logo);
        return redirect('companies/' . $company->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Services\CompaniesService  $companiesService
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, CompaniesService $companiesService)
    {
        $company = $companiesService->get($id);
        return view('companies.show', ['company' => $company]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Services\CompaniesService  $companiesService
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, CompaniesService $companiesService)
    {
        $company = $companiesService->get($id);
        return view('companies.edit', ['company' => $company]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Requests\CompanyRequest  $request
     * @param  \App\Services\CompaniesService  $companiesService
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, CompanyRequest $request, CompaniesService $companiesService)
    {
        $inputs = $request->inputs();
        $company = $companiesService->update($id, $inputs, $request->logo);
        return redirect('companies/' . $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Services\CompaniesService  $companiesService
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, CompaniesService $companiesService)
    {
        $company = $companiesService->remove($id);
        return redirect('companies');
    }
}
