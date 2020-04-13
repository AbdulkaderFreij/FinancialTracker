<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
class Transaction extends Model
{
    protected $fillable = ['start_date', 'end_date', 'amount', 'title', 'description', 'type', 'interval', 
    'currencies_id', 'categories_id', 'users_id'];

    public function category()
    {
        return $this->hasOne(Category::class, 'id','categories_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function currency()
    {
        return $this->hasOne(Currency::class, 'id', 'currencies_id');
    }
}

