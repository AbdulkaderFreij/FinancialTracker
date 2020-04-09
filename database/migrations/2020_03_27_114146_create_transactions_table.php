<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('users_id');
            $table->unsignedBigInteger('currencies_id');
            $table->unsignedBigInteger('categories_id');

            $table->string('title');
            $table->double('amount');
            $table->text('description');
            $table->timestamp('start_date');
            $table->timestamp('end_date')->nullable();
            $table->string('interval')->nullable();
            $table->string('type');

            $table->timestamps();

            $table->index('users_id');
            $table->index('currencies_id');
            $table->index('categories_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
