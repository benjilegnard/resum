<?php

/**        A period is a 'date' event start_date is mandatory, end_date can be null.
<code>
			{
				"startDate":"2011,12,10",
				"endDate":"2011,12,11",
				"headline":"Headline Goes Here",
				"text":"<p>Body text goes here, some HTML is OK</p>",
				"asset":
				{
					"media":"http://twitter.com/ArjunaSoriano/status/164181156147900416",
					"credit":"Credit Name Goes Here",
					"caption":"Caption text goes here"
				}
			}
</code>
*/

class Period extends ActiveRecord\Model{


    static $attr_accessible = array('headline','start_date','end_date','text');

    static $has_many = array('asset');

}