$(document).ready(function(){
  //intialize google map and add text input and autocomplete
	var map;

	function initialize() {

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 35.6439217, lng: -87.082847},
          zoom: 8
        });

        var input = document.getElementById('address_autocomplete');

        //limits autocomplete options to us
         var options = {
  			componentRestrictions: {country: "us"}
 		};
       //Create the autocomplete helper, and associate it with
	  //an HTML text input box.
	  var autocomplete = new google.maps.places.Autocomplete(input,options);

	  autocomplete.bindTo('bounds', map);

	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	  var infowindow = new google.maps.InfoWindow();
	  var marker = new google.maps.Marker({
	    map: map
	  });
	  google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map, marker);
	  });

	  // Get the full place details when the user selects a place from the
	  // list of suggestions.
	  google.maps.event.addListener(autocomplete, 'place_changed', function() {
	    infowindow.close();
	    var place = autocomplete.getPlace();
	    //process Address Selection
	    AddressSelect(place);
	    if (!place.geometry) {
	      return;
	    }

	    if (place.geometry.viewport) {
	      map.fitBounds(place.geometry.viewport);
	    } else {
	      map.setCenter(place.geometry.location);
	      map.setZoom(17);
	    }

	    // Set the position of the marker using the place ID and location.
	    marker.setPlace(/** @type {!google.maps.Place} */ ({
	      placeId: place.place_id,
	      location: place.geometry.location
	    }));
	    marker.setVisible(true);

	    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
	        place.formatted_address + '</div>');
	    infowindow.open(map, marker);
	  });
    }
	// Run the initialize function when the window has finished loading.
	initialize();

	function AddressSelect(place) {
		console.log(place);
		//array is not always in the same order will need to find other ways of determining appropriate fields
		console.log("street address: ",place.address_components[0].long_name+' '+place.address_components[1].long_name);
	    console.log("city: ",place.address_components[2].long_name);
	    console.log("state: ",place.address_components[4].long_name);
	    console.log("zip code: ",place.address_components[6].long_name);	

	    $('#street_address').val(place.address_components[0].long_name+' '+place.address_components[1].long_name);
	    $('#city').val(place.address_components[2].long_name);
	    $('#state').val(place.address_components[4].long_name);
	    $('#zip_code').val(place.address_components[6].long_name);
	}
});