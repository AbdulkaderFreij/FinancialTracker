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
    protected $fillable = ['country', 'symbol', 'code','users_id'];

    public function user()
    {       
            return $this->belongsTo(User::class);
    }
}
