<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\CompanyRequest;
use App\Http\Controllers\CompaniesService;
use App\Http\Controllers\Controller;


class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(CompaniesService $companiesService)
    {
        $companies = $companiesService->getAllCompanies();
        return response()->json($companies);
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
        $company = $companiesService->createCompany($inputs, $request->logo);
        return response()->json($company, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, CompaniesService $companiesService)
    {
        $company = $companiesService->getCompany($id);
        return response()->json($company);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CompanyRequest $request, $id, CompaniesService $companiesService)
    {
        $inputs = $request->inputs();
        $company = $companiesService->updateCompany($id, $inputs, $request->logo);
        return response()->json(null, 204);
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
        return response()->json(null, 204);
    }
}
