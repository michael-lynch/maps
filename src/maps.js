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
			lat: null,
			lng: null,
			zoom: 8,
			markers: [],
			scrollwheel: false,
			draggable: true,
			disable_ui: false,
			zoom_control: true,
			styles: [],
			places: [],
			places_links: null,
			places_radius: '500',
			info_windows: {
				template_places: null
			},
			success: function() {},
			error: function() {},
		},
		plugin = this,
		el = $(this),
		s = $.extend({}, defaults, options),
		markers = [],
		infoWindows = [],
		clearInfoWindows = function() {

			for(var i = 0; i < infoWindows.length; i++) {
				infoWindows[i].close();
			}
		},
		clearMarkers = function() {

			for(i= 0; i < markers.length; i++){
				markers[i].setMap(null);
			}
		},
		createMarker = function(o) {

			if(o.map) {
				var myLatlng = new google.maps.LatLng(o.lat, o.lng),
				marker = new google.maps.Marker({
					position: (myLatlng) ? myLatlng : null,
					map: (o.map) ? o.map : null,
					title: (o.title) ? o.title : null,
					icon: (o.icon) ? o.icon : null,
					animation: google.maps.Animation.DROP
				});

				markers.push(marker);

				return marker;

			} else {
				return false;
			}
		},
		createInfoWindow = function(o) {

			// marker click event
			google.maps.event.addListener(o.marker, 'click', function() {

				// clear info windows
				clearInfoWindows();

				// if place
				if(o.is_place && o.place && o.service) {

					// get place details
					o.service.getDetails(o.place, function(place, status) {

						console.log(place);

						if(status == google.maps.places.PlacesServiceStatus.OK) {

							var template = '<div class="map__info">';

							template += '<h3 class="info__title">'+place.name+'</h3>';

							template += '<div class="info__address">'+place.formatted_address+'</div>';

							template += (place.formatted_phone_number) ? '<div class="info__phone"><strong>P:</strong> <a href="tel:'+place.formatted_phone_number+'" title="Call Now">'+place.formatted_phone_number+'</a></div>' : '';

							template += (place.website) ? '<div class="info__website"><strong>W:</strong> <a href="'+place.website+'" target="_blank">'+place.website+'</div>' : '';

							template += '</div>';

							o.template = template;

							var infoWindow = new google.maps.InfoWindow({
								content: o.template
							});

							// add info window to info windows array
							infoWindows.push(infoWindow);

							// open window
							infoWindow.open(o.map, o.marker);
						}
					});

				} else {

					var infoWindow = new google.maps.InfoWindow({
						content: o.template
					});

					// add info window to info windows array
					infoWindows.push(infoWindow);

					// open window
					infoWindow.open(o.map, o.marker);
				}
			});
		},
		plotPlacesOnMap = function(o) {

			if(google.maps.places) {

				// define latlng object
				var latLng = new google.maps.LatLng(s.lat, s.lng);

				// construct places object
				var placesObj = {
					location: latLng,
					radius: s.places_radius,
					types: o.places
				};

				var placesService = new google.maps.places.PlacesService(o.map);

				// clear markers
				clearMarkers();

				// do a neary search using the places service and places object
				placesService.nearbySearch(placesObj, function(results, status) {

					// if the status was ok
					if(status == google.maps.places.PlacesServiceStatus.OK) {

						// for each place
						for(var i = 0; i < results.length; i++) {

							// define this place
							var place = results[i];

							// create marker on map
							var markerObj = createMarker({
								map: o.map,
								lat: place.geometry.location.lat(),
								lng: place.geometry.location.lng(),
								icon: (o.icon) ? o.icon : null
							});

							// define latlng object
							var latLng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());

							// create info window
							createInfoWindow({
								map: o.map,
								marker: markerObj,
								is_place: true,
								place: {
									reference: place.reference
								},
								service: placesService
							});
						}
					}
				});

			} else {

				// run error callback
				s.error.call(this, 'The Google Maps "places" library is required for the places feature. If you are using V3 of the API you can simply add "&libraries=places" to the end of the url in your scripts tag.');
			}
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
						lng: s.markers[i].lng,
						icon: (s.markers[i].icon) ? s.markers[i].icon : null
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

			// if places were included and the places library is loaded
			if(s.places.length && google.maps.places) {

				// plot places on map
				plotPlacesOnMap({
					places: s.places,
					map: map
				});

			} else if(s.places.length) {

				// run error callback
				s.error.call(this, 'The Google Maps "places" library is required for the places feature. If you are using V3 of the API you can simply add "&libraries=places" to the end of the url in your scripts tag.');
			}

			// if places links were set
			if(s.places_links) {

				s.places_links.on('click', function(e) {

					e.preventDefault();

					var placeType = $(this).data('place-type'),
						placeIcon = $(this).data('place-icon');

					if(placeType && map) {

						// plot places on map
						plotPlacesOnMap({
							places: [placeType],
							map: map,
							icon: (placeIcon) ? placeIcon : null
						});

					} else {

						// run error callback
						s.error.call(this, 'An element requires the data-place-type attribute to update the places on a map.');
					}
				});
			}

			// run success callback
			s.success.call(this);
		}

		// if google api is loaded
		if(window.google) {

			// create maps
			createMaps();

		} else {

			// run error callback
			s.error.call(this, 'The Google Maps API is required for this plugin. You may also require the places library if you are using the places feature.');
		}
	}

})(jQuery);
