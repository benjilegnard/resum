<?php
/**
 * Created by IntelliJ IDEA.
 * User: BELEGRAN
 * Date: 11/12/13
 * Time: 11:35
 *
 * @Entity @Table(name="projects")
 **/
class Project
{

    /** @Id @Column(type="integer") @GeneratedValue **/
    protected $id;

    /** @Column(type="string") **/
    protected $name;

    /** @Column(type="string") **/
    protected $description;
}
