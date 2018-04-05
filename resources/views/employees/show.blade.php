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
						{!! Form::text('company', $employee->companies->name, ['class' => 'form-control', 'id' => 'company']) !!}
					</div>
					<a class="btn btn-primary" href="/employee/{{$employee->id}}/edit">Edit</a>
					{!! Form::open(['url' => '/employee/'.$employee->id, 'method' => 'delete']) !!}
					<button type="submit" class="btn btn-danger">Delete</button>
					{!! Form::close() !!}
            	</div>
            </div>
        </div>
    </div>
</div>
@endsection