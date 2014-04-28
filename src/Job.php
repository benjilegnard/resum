<?php
/**
 * src/Job
 *
 * User: BELEGRAN
 * Date: 11/12/13
 * Time: 11:35
 *
 * @Entity @Table(name="jobs")
 **/
class Job
{

    /** @Id @Column(type="integer") @GeneratedValue **/
    protected $id;

    /** @Column(type="string") **/
    protected $name;

    /** @Column(type="string") **/
    protected $description;
}
