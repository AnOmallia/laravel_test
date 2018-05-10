<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'logo' => 'mimes:jpeg,png,jpg,svg|dimensions:min_width=100,min_height=100',
        ];
    }
    /**
     * Made input fields changes.
     *
     * @return array
     */
    public function inputs()
    {
        $inputs = $this->_method ? $this->except(['_token', '_method']) :$this->except(['_token']);
        if($this->hasFile('logo')){
            $path = storage_path('app/public/logos');
            if (!file_exists($path)) {
                File::makeDirectory($path);
            }

            $imageName = time().'.'.$inputs['logo']->getClientOriginalExtension();
            //dd($imageName);
            $inputs['logo']->move($path, $imageName);
            $inputs['logo'] = $imageName;
        }
        return $inputs;
    }
}
//http://laraveltest.loc/storage/logos//tmp/phpjKSoD6