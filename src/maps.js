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
    
    	// return if no element was bound
		// so chained events can continue
		if(!this.length) { 
			return this; 
		}
		
		// define vars
        var defaults = {
        	load_api: true,
            lat: null,
            lng: null,
            zoom: 8,
            markers: [],
            scrollwheel: false,
            draggable: true,
            disable_ui: false,
            zoom_control: true,
            styles: [],
            success: function() {},
            error: function() {},
		},
    	plugin = this,
    	el = $(this),
    	s = $.extend({}, defaults, options),
		createMarker = function(o) {
    
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
		},
        createInfoWindow = function(o) {
	        
	        var contentString = o.template,
				infowindow = new google.maps.InfoWindow({
					content: contentString
				});
			
			// marker click event
			google.maps.event.addListener(o.marker, 'click', function() {
				infowindow.open(o.map, o.marker);
			});
        },
        createMaps = function() {

			// set map options
			var mapOptions = {
					center: {
						lat: s.lat,
						lng: s.lng
					},
					zoom: s.zoom,
					scrollwheel: s.scrollwheel,
					draggable: s.draggable,
					disableDefaultUI: s.disable_ui,
					zoomControl: s.zoom_control
				},
				map = new google.maps.Map(el[0], mapOptions);
			
			// if styles were set	
			if(s.styles.length) {
				map.set('styles', s.styles);
			}
			
			// if markers were included
			if(s.markers) {
			
				// loop through each marker
				for(var i = 0; i < s.markers.length; i++) {
		
					// create marker on map
					var markerObj = createMarker({
						map: map,
						lat: s.markers[i].lat,
						lng: s.markers[i].lng
					});
					
					// if info_window was included in marker object
					if(markerObj && s.markers[i].info_window.template) {
			
						// create info window
						createInfoWindow({
							map: map,
							marker: markerObj,
							template: s.markers[i].info_window.template
						});
					
					}
				
				}
			
			}
			
			// run success callback
			s.success.call(this);
		}
		
		// if google api is loaded
		if(window.google) {
			createMaps();
		} else {
			// run error callback
			s.error.call(this);
		}
    }

})(jQuery);
