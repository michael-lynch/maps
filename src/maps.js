/*!

Name: Maps
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: June 25 2015
Licensed under the MIT license

*/

;(function($) {

    $.fn.maps = function(options) {
    
    	//return if no element was bound
		//so chained events can continue
		if(!this.length) { 
			return this; 
		}

		//define default parameters
        var defaults = {
        	load_api: true,
            lat: null,
            lng: null,
            markers: [],
            scrollwheel: false,
            draggable: true,
            disable_ui: false,
            zoom_control: true,
            error: function(message) {},
            success: function() {}
        }

        //define vars
        var plugin = this,
        	el = $(this);
		
		//define settings
        plugin.settings = {};
 
        //merge defaults and options
        plugin.settings = $.extend({}, defaults, options);

		var s = plugin.settings;
				
        var createMarker = function(o) {
        
        	if(o.map) {
				var myLatlng = new google.maps.LatLng(o.lat, o.lng),
				marker = new google.maps.Marker({
					position: (myLatlng) ? myLatlng : null,
					map: (o.map) ? o.map : null,
					title: (o.title) ? o.title : null
				});
				
				return marker;
			
			} else {
				return false;
			}
        }
        
        var createInfoWindow = function(o) {
	        
	        var contentString = o.template,
			infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			
			// marker click event
			google.maps.event.addListener(o.marker, 'click', function() {
				infowindow.open(o.map, o.marker);
			});
        }
		
		function createMaps() {
			
			el.each(function() {
				
				console.log($(this)[0]);

				var mapOptions = {
					center: {
						lat: s.lat,
						lng: s.lng
					},
					zoom: s.zoom,
					scrollwheel: (s.scrollwheel) ? s.scrollwheel : false,
					draggable: (s.draggable) ? s.draggable : true,
					disableDefaultUI: (s.disable_ui) ? s.disable_ui : false,
					zoomControl: (s.zoom_control) ? s.zoom_control : true
				},
				map = new google.maps.Map($(this)[0], mapOptions);
				
				if(s.markers) {
				
					for(var i = 0; i < s.markers.length; i++) {
			
						var markerObj = createMarker({
							map: map,
							lat: s.markers[i].lat,
							lng: s.markers[i].lng
						});
						
						if(markerObj && s.markers[i].info_window.template) {
				
							createInfoWindow({
								map: map,
								marker: markerObj,
								template: s.markers[i].info_window.template
							});
						
						}
					
					}
				
				}
			
			});
			
			// run success callback
			s.success.call(this);
		}
		
		if(typeof window.google === 'object' && typeof window.google.maps === 'object') {
			createMaps();
		}
		
		if(s.load_api) {
        
	        var script = document.createElement("script");
			
			// set script attributes
			script.type = "text/javascript";
			script.src  = "http://maps.google.com/maps/api/js?v=3&sensor=true&callback=gmap_draw";
			
			// append script
			$("head").append(script);
		}

        window.gmap_draw = function() {
		
			function initialize() {
			
				createMaps();
				
			}
				
			google.maps.event.addDomListener(window, 'load', initialize);
				
		};
    }

})(jQuery);
