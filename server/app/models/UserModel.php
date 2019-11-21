<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class User extends Model {

public $firstName;
public $lastName;
/**
 * The database table used by the model.
 *
 * @var string
 */
protected $table = 'resum_users';
/**
 * The attributes excluded from the model's JSON form.
 *
 * @var array
 */
protected $hidden = array('password');
}