@extends('layouts.app')

@section('content')

<div class="container">
<a type="button" class="btn btn-info" href="/employees/create"><i class="fa fa-plus" aria-hidden="true"></i> Add Employee</a>
<div class="table-responsive">
  	<table class="table table-bordered table-hover table-striped">
	    <thead>
	      	<tr>
		        <th>Firstname</th>
		        <th>Lastname</th>
		        <th>Email</th>
		        <th>Phone</th>
		        <th>Company</th>
		        <th>Action</th>
	      	</tr>
	    </thead>
	    <tbody>
	    @foreach ($employees as $employee)
	      	<tr>
		        <td>{{ $employee->first_name }}</td>
		        <td>{{ $employee->last_name }}</td>
		        <td>{{ $employee->email }}</td>
		        <td>{{ $employee->phone }}</td>
		        <td>{{ $employee->company->name }}</td>
		        <td>
		        <div class="btn-group">
				  	<a type="button" class="btn btn-info" href="/employees/{{$employee->id}}"><i class="fa fa-eye" aria-hidden="true"></i></a>
				  	<a type="button" class="btn btn-primary" href="/employees/{{$employee->id}}/edit"><i class="fa fa-edit" aria-hidden="true"></i></a>
				  	
				  	{!! Form::open(['url' => '/employees/'.$employee->id, 'method' => 'delete']) !!}
						<button type="submit" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
					{!! Form::close() !!}
				</div>
		        </td>
	      	</tr>
	    @endforeach
	    </tbody>
  	</table>
    {{ $employees->links() }}
</div>
</div>

@endsection