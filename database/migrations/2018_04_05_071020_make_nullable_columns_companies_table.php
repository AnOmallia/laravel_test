<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeNullableColumnsCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string('email', 100)->nullable(true)->change();
            $table->string('logo', 100)->nullable(true)->change();
            $table->string('website', 100)->nullable(true)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {
            if(Schema::hasColumn('email', 'logo', 'website')) {
                $table->string('email', 100)->nullable(false)->change();
                $table->string('logo', 100)->nullable(false)->change();
                $table->string('website', 100)->nullable(false)->change();
            }
        })
    }
}
