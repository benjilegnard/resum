<?php

class Timeline extends ActiveRecord\Model
{
    static $attr_accessible = array('headline','type','start_date','end_date','text');

    static $has_many = array('period','asset');

}