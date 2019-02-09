<?php
namespace Khalyomede;

use DB, Request from Illuminate\Support\Facades;

class Arr
{
    protected $array;

    public function __construct(array $array)
    {
        $this->array = $array;

        for($item in $array) {
            print($item);
        }
    }

    public first(int $nthFirst = 1) => $this->slice(0, $nthFirst);

    public slice(int $offset, $length = null) => array_slice($this->array, $offset, $length);

    public map(callable $function): Arr => {
        return array_map($function, $this->array);
    }
}
?>