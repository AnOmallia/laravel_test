@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Add Companie</div>
                <div class="card-body">
	                {!! Form::open(['url' => '/employees/'. $employee->id, 'method' => 'put']) !!}
	                	{{ csrf_field() }}
	                	<div class="form-group">
							<label for="firstName">First name:</label>
							{!! Form::text('first_name', $employee->first_name, ['class' => 'form-control', 'id' => 'firstName']) !!}
						</div>
						<div class="form-group">
							<label for="lastName">Last name:</label>
							{!! Form::text('last_name', $employee->last_name, ['class' => 'form-control', 'id' => 'lastName']) !!}
						</div>
						<div class="form-group">
							<label for="email">Email address:</label>
							{!! Form::email('email', $employee->email, ['class' => 'form-control', 'id' => 'email']) !!}
						</div>
						<div class="form-group">
							<label for="phone">Phone:</label>
							{!! Form::tel('phone', $employee->phone, ['class' => 'form-control', 'id' => 'phone']) !!}
						</div>
						<div class="form-group">
							<label for="company">Company name:</label>
							<select name="company_id" class="form-control">	
								@foreach($companies as $company)
									@if($company->id == $employee->company_id)
									<option value="{{$company->id}}" selected>{{$company->name}}</option>
									@else
									<option value="{{$company->id}}">{{$company->name}}</option>
									@endif
								@endforeach
							</select>
						</div>
						{{-- <a class="btn btn-primary" href="/employees/{{$employee->id}}/edit">Edit</a> --}}
						<button type="submit" class="btn btn-success">Save</button>
					{!! Form::close() !!}
            	</div>
            </div>
        </div>
    </div>
</div>
@endsection