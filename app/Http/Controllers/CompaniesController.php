<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CompanyRequest;
use App\Http\Controllers\CompaniesService;

class CompaniesController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
        $this->model = "Company";
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(CompaniesService $companiesService)
    {
        $companies = $companiesService->getAllCompanies();
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CompanyRequest $request, CompaniesService $companiesService)
    {
        $inputs = $request->inputs();
        $company_id = $companiesService->createCompany($inputs, $request->logo);
        return redirect('companies/' . $company_id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, CompaniesService $companiesService)
    {
        $company= $companiesService->getCompany($id);
        return view('companies.show', ['company' => $company]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, CompaniesService $companiesService)
    {
        $company= $companiesService->getCompany($id);
        return view('companies.edit', ['company' => $company]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, CompanyRequest $request, CompaniesService $companiesService)
    {
        $inputs = $request->inputs();
        $company = $companiesService->updateCompany($id, $inputs, $request->logo);
        return redirect('companies/' . $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, CompaniesService $companiesService)
    {
        $company = $companiesService->removeCompany($id);
        return redirect('companies');
    }
}
