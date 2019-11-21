<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model {

    protected $table = 'resum_nodes';

    public $id;

    /**
     * blob with data
     */
    public $data;

    public $contentType;
}