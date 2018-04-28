{{-- @extends('layouts.app')

@section('content')

<div class="container">
<a type="button" class="btn btn-info" href="/company/create"><i class="fa fa-plus" aria-hidden="true"></i> Add Company</a>
<div class="table-responsive">
  	<table class="table table-bordered table-hover table-striped">
	    <thead>
	      	<tr>
		        <th>Name</th>
		        <th>Email</th>
		        <th>Website</th>
		        <th>Logo</th>
		        <th>Action</th>
	      	</tr>
	    </thead>
	    <tbody>
	    @foreach ($companies as $company)
	      	<tr>
		        <td>{{ $company->name }}</td>
		        <td>{{ $company->email }}</td>
		        <td>{{ $company->website }}</td>
		        <td>{{ $company->logo }}</td>
		        <td>
			        <div class="btn-group">
					  	<a type="button" class="btn btn-info" href="/company/{{$company->id}}"><i class="fa fa-eye" aria-hidden="true"></i></a>
					  	<a type="button" class="btn btn-primary" href="/company/{{$company->id}}/edit"><i class="fa fa-edit" aria-hidden="true"></i></a>
					  	
					  	{!! Form::open(['url' => '/company/'.$company->id, 'method' => 'delete']) !!}
							<button type="submit" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
						{!! Form::close() !!}
					</div>
		        </td>
	      	</tr>
	    @endforeach
	    </tbody>
  	</table>
    {{ $companies->links() }}
</div>
</div>

@endsection --}}


@extends('layouts.app')

@section('content')

	<div id="app"></div>

@endsection