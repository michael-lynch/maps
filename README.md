#Maps

Maps is a simple, lightweight jQuery plugin used to display Google maps.

<a href="http://michael-lynch.github.io/maps/" target="_blank">See a demo</a>

##Instructions

Include jQuery, the Google Maps API and the plugin in the head or footer of your page.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="http://maps.google.com/maps/api/js?v=3&sensor=true"></script>
<script src="/js/plugins/maps.js"></script>
```
    
Initialize the plugin targeting the class, ID or element that you want the daily message to be inserted into and send the plugin your custom messages for each day. 

```js
$('.map').maps({
	lat: 37.485013,
	lng: -122.148499,
	zoom: 12,
	scrollwheel: true,
	markers: [{
		lat: 37.485013,
		lng: -122.148499,
		info_window: {
			template: $(this).find('.map__info').html()
		}
	}],
	success: function() {
	    console.log('Success!');
	},
	error: function() {
	    console.log('Something went wrong.');
	}		
});
```
	
####Options

<ol>

<li>
lat: integer
<br />An integer that defines the latitude the map should be centered on (default: null).
</li>

<li>
lng: integer
<br />An integer that defines the longitude the map should be centered on (default: null).
</li>

<li>
zoom: integer
<br />An integer that defines how far the map should be zoomed in. Zooms range from 0-12. (default: 8).
</li>

<li>
scrollwheel: boolean
<br />A boolean that defines whether or not the map should be scrollable (default: false).
</li>

<li>
draggable: boolean
<br />A boolean that defines whether or not the map should be draggable (default: true).
</li>

<li>
disable_ui: boolean
<br />A boolean that defines whether or not the default UI should be displayed (default: false).
</li>

<li>
zoom_control: boolean
<br />A boolean that defines whether or not the user can zoom in and out on the map (default: true).
</li>

<li>
markers: []
<br />An array of objects that define each marker that should be displayed on the map (default: null).
</li>

<li>success: function()
<br />A callback function that runs if the plugin is successfull (default: `function()`). 
</li>

<li>error: function()
<br />A callback function that runs if the plugin fails (default: `function()`). 
</li>

</ol>		