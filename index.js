$(document).ready(function(){
  //intialize google map and add text input and autocomplete
	var map;
	var memberCount = 0; //reset memberCount when program reloads
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
		//console.log(place);
	    var address_array = place.formatted_address.split(',');
	    var statezip_array = address_array[2].split(' ');
	    console.log('statezip', statezip_array);
	    var state = statezip_array[1];
	    var zip = statezip_array[2];

	    console.log('array', address_array);
	    $('#street_address').val(address_array[0]);
	    $('#city').val(address_array[1]);
	    $('#state').val(state);
	    $('#zip_code').val(zip);
	}

	
	var memberSection = $('#AddFamilyMember');
	//write a function that injects new family member cards into dom
	function addNewFamilyMember() {
		memberCount++;
		console.log(memberCount);
		memberSection.append(`<div class="col-sm-4" id="member--${memberCount}>
				<div class="card">
					<div class="card-header">Family Member</div>
					<div class="card-main">
						<form>
						  <div class="form-group">
						    <label class="radio-inline">
							  <input type="radio" name="inlineRadioOptions" id="AdultStatus--${memberCount}" value="Adult"> adult
							</label>
							<label class="radio-inline">
							  <input type="radio" name="inlineRadioOptions" id="AdultStatus--${memberCount}" value="Child"> child
							</label>
						  </div>
						  <div class="form-group">
						    <label for="city">Name</label>
						    <input type="text" class="form-control" id="name--${memberCount}" placeholder="Nashville">
						  </div>
						  <div class="form-group">
						    <label for="state">Birthday</label>
						    <input type="text" class="form-control" id="birthday--${memberCount}" placeholder="TN">
						  </div>
						  <div class="form-group">
						    <label for="zip_code">Cell Phone #</label>
						    <input type="text" class="form-control" id="cell_phone--${memberCount}" placeholder="37206">
						  </div>
						</form>
					</div>
				</div>
			</div>`);
	}
	addNewFamilyMember();

	$('#addMember').click(function(){
		addNewFamilyMember();
	});

	//write a function to build family json object and write to text file
	function saveFamily() {
		
	}
});