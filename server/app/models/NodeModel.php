<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Node extends Model {

    protected $table = 'resum_nodes';

    public $id;
    public $parentNodeId;
    public $content_fr;
    public $content_en;
    public $content_de;
    public $content_es;
    public $content_it;

}