@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Add Companie</div>

                <div class="card-body">
	                {!! Form::open(['url' => '/employees', 'method' => 'post']) !!}
	                	{{ csrf_field() }}
	                	<div class="form-group">
							<label for="firstName">First name:</label>
							{!! Form::text('first_name', null, ['class' => 'form-control', 'id' => 'firstName']) !!}
						</div>
						<div class="form-group">
							<label for="lastName">Last name:</label>
							{!! Form::text('last_name', null, ['class' => 'form-control', 'id' => 'lastName']) !!}
						</div>
						<div class="form-group">
							<label for="email">Email address:</label>
							{!! Form::email('email', null, ['class' => 'form-control', 'id' => 'email']) !!}
						</div>
						<div class="form-group">
							<label for="phone">Phone:</label>
							{!! Form::tel('phone', null, ['class' => 'form-control', 'id' => 'phone']) !!}
						</div>
						<div class="form-group">
							<label for="company">Company name:</label>
							{!! Form::select('company_id', $companies, null, ['class' => 'form-control', 'id' => 'company']) !!}
						</div>
						<button type="submit" class="btn btn-success">Save</button>
					{!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection