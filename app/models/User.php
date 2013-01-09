<?php

class User extends ActiveRecord\Model
{
    static $attr_accessible = array('first_name');

    static $has_many = array(array('timeline'));

    /*
        A setter method must have set_ prepended to its name to qualify.
        $this->encrypted_password is the actual attribute for this model.
    */
    public function set_password($plaintext) {
        $this->encrypted_password = md5($plaintext);
    }
}