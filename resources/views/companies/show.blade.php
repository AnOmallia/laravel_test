@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Add Companie</div>

                <div class="card-body">
                	{{ csrf_field() }}
                	<div class="form-group">
						<label for="firstName">Company name:</label>
						{!! Form::text('first_name', $company->name, ['class' => 'form-control', 'id' => 'firstName']) !!}
					</div>
					<div class="form-group">
						<label for="email">Email address:</label>
						{!! Form::email('email', $company->email, ['class' => 'form-control', 'id' => 'email']) !!}
					</div>
					<div class="form-group">
						<label for="company">Website:</label>
						{!! Form::text('website',  $company->website, ['class' => 'form-control', 'id' => 'website']) !!}
					</div>
					<div class="form-group">
						<label for="logo">Company logo:</label>
						{!! Form::text('logo', $company->logo, ['class' => 'form-control', 'id' => 'logo']) !!}
					@if($company->logo)
						<img src="{{ asset('storage/logos/'.$company->logo)  }}" alt="logo" width="100px" height="100px">
					@endif
					</div>
					<a class="btn btn-primary" href="/companies/{{$company->id}}/edit">Edit</a>
					{!! Form::open(['url' => '/companies/'.$company->id, 'method' => 'delete']) !!}
					<button type="submit" class="btn btn-danger">Delete</button>
					{!! Form::close() !!}
            	</div>
            </div>
        </div>
    </div>
</div>
@endsection