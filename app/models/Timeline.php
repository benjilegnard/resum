<?php

class Timeline extends ActiveRecord\Model
{
    static $has_many = array('period');

}