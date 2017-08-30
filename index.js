$(document).ready(function(){

    $("#address_autocomplete").keyup(function(e){
    	console.log(this.value);
        var xhr = new XMLHttpRequest
    	$.ajax({ 
     	       method:'GET',   
     	       url:`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.value}&key=AIzaSyCaXlLbfmGNGWfnZJ7OhJnawD36mJ2OvcE`      
     	}).then((response) => {
     	   		let items = [];
				Object.keys(response).forEach(function(key){
					response[key].id = key;
					items.push(response[key]);
				});
				console.log(items);
     	   }, (error)=> {
     	   		throw new Error(error);
     	});

        // $.getJSON(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.value}&key=AIzaSyCaXlLbfmGNGWfnZJ7OhJnawD36mJ2OvcE`,function(data, status)
        // {
        // 	console.log("return from google places", data+", "+status);
        // });
	});
});