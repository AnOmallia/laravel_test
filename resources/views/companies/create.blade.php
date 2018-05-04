@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Add Companie</div>

                <div class="card-body">
	                {!! Form::open(['url' => '/company', 'method' => 'post', 'files' => true]) !!}
	                	{{ csrf_field() }}
	                	<div class="form-group">
							<label for="firstName">Company name:</label>
							{!! Form::text('name', null, ['class' => 'form-control', 'id' => 'firstName']) !!}
						</div>
						<div class="form-group">
							<label for="email">Email address:</label>
							{!! Form::email('email', null, ['class' => 'form-control', 'id' => 'email']) !!}
						</div>
						<div class="form-group">
							<label for="company">Website:</label>
							{!! Form::text('website',  null, ['class' => 'form-control', 'id' => 'website']) !!}
						</div>
						<div class="form-group">
							<label for="logo">Company logo:</label>
							{!! Form::file('logo', null, ['class' => 'form-control', 'id' => 'logo']) !!}
						</div>
						<button type="submit" class="btn btn-default">Save</button>
					{!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection