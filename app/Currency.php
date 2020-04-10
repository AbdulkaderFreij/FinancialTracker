<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


/**
 * Class Currency
 *
 **/
class Currency extends Model
{
    use SoftDeletes;

    protected $fillable = ['country', 'symbol', 'code'];

}
