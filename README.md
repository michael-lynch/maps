# Maps

Maps is a simple, lightweight jQuery plugin used to display Google maps.

<a href="http://michael-lynch.github.io/maps/" target="_blank">See a demo</a>

## Instructions

Include jQuery, the Google Maps API and the plugin in the head or footer of your page.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="http://maps.google.com/maps/api/js?v=3&libraries=places"></script>
<script src="/js/plugins/maps.js"></script>
```

Note that the `places` library is required if you'd like to display places on the map.

Initialize the plugin targeting the class, ID or element that you want to render the map with.

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
	error: function(message) {
	    console.log(message);
	}		
});
```

```html
<div class="map">
	<div class="map__info">
		This will display inside the tooltip that appears when you click on the marker.
	</div>
</div>
```

If you're using links to display place types on the map, the plugin expects the links to use a required `data-place-type` attribute and an optional `data-place-icon` attribute:

```html
<div class="location__places">
	<a href="#" data-place-type="bank" data-place-icon="/path/to/icon/banks.png">Banks</a>
	<a href="#" data-place-type="laundry" data-place-icon="/path/to/icon/laundry.png">Laundromats</a>
	<a href="#" data-place-type="store" data-place-icon="/path/to/icon/stores.png">Stores</a>
</div>
```

Then you'd initialize the plugin using the `places_links` property:

```js
$('.location__map').maps({
	lat: 37.485013,
	lng: -122.148499,
	places_links: $('.location__places a')		
});
```

#### Options

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
<br />An integer that defines how far the map should be zoomed in. The zoom value must be between 0-22. (default: 8).
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

<li>
styles: []
<br />An array of styles for individual features on the map (default: []).
</li>

<li>
places: []
<br />An array of place types to be displayed on the map on load (default: []) See the list of available place types [here](https://developers.google.com/places/supported_types).
</li>

<li>
places_links: $()
<br />A jQuery object that defines the element(s) that will have the places click event bound to (default: null).
</li>

<li>
places_radius: ''
<br />A string that defines the maximum radius around the center point of the map in which nearby places will be displayed (default: '500').
</li>

<li>success: function()
<br />A callback function that runs if the plugin is successful (default: `function()`).
</li>

<li>error: function()
<br />A callback function that runs if the plugin fails (default: `function()`).
</li>

</ol>

*Note that the `markers` array must be made up of objects that are in this format:*

```js
$('.map').maps({
	markers: [{
		lat: 37.485013,
		lng: -122.148499,
		info_window: {
			template: $(this).find('.map__info').html()
		}
		icon: 'path/to/icon.svg'
	}]		
});

```

*Also note that the `styles` array must be made up of objects that are in [the format Google expects](https://developers.google.com/maps/tutorials/customizing/styling-the-base-map). Here is a single style object with every possible styler set.*

```js
var styles = [
	{
    	"featureType": "landscape",
    	"elementType": "geometry",
    	"stylers": [
    	{
           	 visibility: "on"
        },
        {
            color: "#fefefe"
        },
        {
            hue: "#dddddd"
        },
        {
            lightness: 17
        },
        {
            weight: 1.2
        },
        {
            saturation: 36
        },
        {
            gamma: 1
        },
        {
            invert_lightness: true
        }
	}
];
```

[The Google Styled Maps Wizard](http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html?utm_medium=twitter) is a great tool for customizing your own styles and [SnazzyMaps](https://snazzymaps.com) has a great collection of premade styles to choose from.
