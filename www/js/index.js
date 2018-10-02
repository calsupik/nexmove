/* Custom JavaScript */

//Database Url Location
var urlString = 'https://nexmove.herokuapp.com';

//Locations Array
var locations = [];

//Map Variable
var map = null;

//Current Location
var currentLocation = null;

//Current Location Radius
var currentLocationRadius = null;

//Navigation Watch ID	
var watchID = null;

//Application Function	
var app = {

	//Application Constructor
	initialize: function () {
		this.bindEvents();
	},

	//Bind Event Listeners
	//
	//Bind any events that are required on startup. 
	//Common events are: 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function () {
		//this.onDeviceReady();
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	//Device Ready Event Handler
	onDeviceReady: function () {
		app.recievedEvent('deviceready');
	},

	//Function Run on Device Ready
	recievedEvent: function (id) {
		if (id == 'deviceready') {
			app.deviceReady();
		}
	},

	//Device Ready Function
	deviceReady: function () {

		//Listen for Notification Click	
		cordova.plugins.notification.local.on("click", function (notification, state) {
			var locationID = "#location" + notification.id;
					
			if($("#details").html()){
				
				//Show specific location details				
				$(locationID).click();
				
			}

			//var elm = document.querySelector("#location" + notification.id);

			//Simulate mouse click
			/*
			var evt = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				view: window
			});

			if (document.querySelector("#details").innerHTML) {
				elm.dispatchEvent(evt);
			}
			*/
		});

		//Top Display Buttons Click Function
		document.querySelectorAll(".display li").forEach(function(el){
			el.addEventListener("click", function () {
				document.querySelector(".display .active").classList.remove("active");
				this.classList.add("active");
			});
		});

		//Bottom Category Buttons Click Function
		document.querySelectorAll(".category li").forEach(function(el){
			el.addEventListener("click", function () {
				document.querySelector(".category .active").classList.remove("active");
				this.classList.add("active");
			});
		});

		//Initialize Map
		app.initMap();

		//Displays Map
		app.displayMap();

	},

	//Initializes Map
	initMap: function () {

		//Initial Lat/Lng
		var lat = 0;
		var lng = 0;

		//Creating Map
		map = new GMaps({
			div: '#map',
			lat: lat,
			lng: lng,
			zoom: 18
		});

		//Creating Current Location Center
		currentLocation = map.drawCircle({
			lat: lat,
			lng: lng,
			radius: 4,
			strokeColor: 'dodgerblue',
			strokeOpacity: 1,
			strokeWeight: 1,
			fillColor: 'dodgerblue',
			fillOpacity: 1,
			zIndex: 2
		});

		//Creating Current Location Radius
		currentLocationRadius = map.drawCircle({
			lat: lat,
			lng: lng,
			radius: 8,
			strokeColor: 'dodgerblue',
			strokeOpacity: 0.0,
			strokeWeight: 1,
			fillColor: 'dodgerblue',
			fillOpacity: 0.25,
			zIndex: 1
		});

		//Creating Center Map Control
		map.addControl({
			position: 'top_right',
			content: '',
			style: {
				margin: '10px',
				height: '30px',
				width: '30px',
				background: 'white',
				backgroundImage: 'url("./img/current.png")'
			},
			events: {
				click: function () {
					map.setCenter(currentLocation.getCenter().lat(), currentLocation.getCenter().lng());
					map.setZoom(18);
				}
			}
		});

		//Turn On Background Geolocation
		backgroundGeolocation.start();

		//Turn Off Background Geolocation
		//backgroundGeolocation.stop(); 

		//Get Current Location	
		navigator.geolocation.getCurrentPosition(app.onInitSuccess, app.onError);

		//Navigation Watch Options
		var watchOptions = {
			enableHighAccuracy: true
		};

		//Start Tracking Location	
		watchID = navigator.geolocation.watchPosition(app.onSuccess, app.onError, watchOptions);

	},

	//onInitSuccess callback receives position object and updates position on map
	onInitSuccess: function (position) {

		//Sets Current LatLng Variable
		var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		//Set Map Center
		map.setCenter(position.coords.latitude, position.coords.longitude);

		//Set currentLocation Position
		currentLocation.setCenter(latlng);

		//Set currentLocationRadius Position
		currentLocationRadius.setCenter(latlng);

		//Get Nearby Locations from Database based off Current Location
		app.getLocations(null);

		//onSuccess Call
		app.onSuccess(position);

	},

	//onSuccess callback receives position object and updates position on map
	onSuccess: function (position) {

		//Sets Current LatLng Variable
		var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

		//Set currentLocation Position
		currentLocation.setCenter(latlng);

		//Set currentLocationRadius Position
		currentLocationRadius.setCenter(latlng);

		//Loop through Geofences
		locations.forEach(function(location) {

			//Checks if current location is within any Locations geofence
			if (map.checkGeofence(position.coords.latitude, position.coords.longitude, location.geofence)) {

				//Alert if location is inside location geofence
				if (location.inside) {
					//Location is already inside geofence
				} else {

					//Sets location inside geofence
					location.setInside();

					//Creates Notification Object
					var notification = {
						id: location.id,
						title: location.name,
						text: location.short_desc,
						foreground: true
					};

					cordova.plugins.notification.local.schedule(notification);
				}

			} else {

				//Sets location outside geofence
				location.setOutside();
			}
		});
	},

	//onError Callback receives a PositionError object
	onError: function (error) {
		console.log('Location Error. Error Code: ' + error.code + '. Error Message: ' + error.message);
	},

	//Gets Nearby Locations from Database
	getLocations: function (type) {
		var urlStringAddition = type ? '/locations/type/' + type : '/locations/';

		var currentLat = currentLocation.getCenter().lat();
		var currentLng = currentLocation.getCenter().lng();
		var distance = locationsDistance;
		
		var request = new XMLHttpRequest();
		request.open('GET', databaseUrl + '/getlocations', true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
				var locations = JSON.parse(request.responseText)
				app.loadLocations(locations);
				if(onSuccessCallback){
					onSuccessCallback();
				}
		  } else {
				//Request Error
				//console.log('Request Error')
		  }
		};
		
		request.onerror = function() {
		  //Connection Error
		  //console.log('Connection Error')
		};
		
		request.send();

		/*
		jQuery.ajax({
			url: urlString + urlStringAddition,
			type: 'GET',
			//data: {lat:currentLat,lng:currentLng,type:type},
			//dataType: 'json',
			async: true,
			success: function (json) {
				var locations = JSON.parse(json);
				app.loadLocations(locations);
			},
			error: function () {
				console.log("AJAX Error Getting Locations");
			}
		});
		*/

	},

	//Creates Location Objects and pushes them into the Locations Array
	loadLocations: function (json) {

		locations = [];

		var list = '<div class="container"><div class="row">';

		var details = '';

		//for (var i = 0; i < json.length; i++) {
		json.forEach(function(location) {

			//Creates Location in List
			list +=
				'<div class="col-md-4 col-sm-6 locations-item text-center">' +
				'<a id="location' + location.id + '" href="#locationDetail' + location.id + '" class="locations-link" data-toggle="modal">' +
				'<div class="locations-hover">' +
				'<div class="locations-hover-content">' +
				'</div>' +
				'</div>' +
				'<img src="' + urlString + '/images/' + location.img + '"  class="img-responsive img-rounded" alt="">' +
				'</a>' +
				'<div class="locations-caption">' +
				'<h4>' + location.name + '</h4>' +
				'<p class="text-muted">' + location.short_desc + '</p>' +
				'</div>' +
				'</div>';

			//Creates Location Details Popup Modal
			details +=
				'<div class="locations-modal modal fade text-center" id="locationDetail' + location.id + '" tabindex="-1" role="dialog" aria-hidden="true" style="visibility:visible" >' +
				'<div class="vertical-alignment-helper">' +
				'<div class="modal-dialog vertical-align-center">' +
				'<div class="modal-content">' +
				'<div class="close-modal" data-dismiss="modal">' +
				'<div class="lr">' +
				'<div class="rl">' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="container">' +
				'<div class="row">' +
				'<div class="col-lg-8 col-lg-offset-2">' +
				'<div class="modal-body">' +
				'<h2>' + location.name + '</h2>' +
				'<p class="item-intro text-muted">' + location.short_desc + '</p>' +
				'<img class="img-responsive" src="' + urlString + '/images/' + location.img + '" alt="">' +
				'</br>' +
				'<p>' + location.long_desc + '</p>' +
				'<button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times"></i> Close Details</button>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>';

			//Create New Location Object
			var locationObj = new app.Location(location);

			//Push Location Object onto Array of Locations
			locations.push(locationObj);

		});

		list += '</div></div>';

		document.getElementById("locations").innerHTML = list;
		document.getElementById("details").innerHTML = details;
	},

	//Location Object
	Location: function (location) {
		this.id = location.id;
		this.name = location.name;
		this.short_desc = location.short_desc;
		this.long_desc = location.long_desc;
		this.img = location.img;
		this.lat = location.lat;
		this.lng = location.lng;
		this.radius = parseFloat(location.radius);
		this.inside = false;

		/*
		this.marker = map.addMarker({
			lat: this.lat,
			lng: this.lng,
			clickable: true,
			opacity: 1.0
		});
		*/

		this.geofence = map.drawCircle({
			lat: this.lat,
			lng: this.lng,
			radius: this.radius || 10,
			strokeColor: '#F89B3B',
			strokeOpacity: 0.5,
			strokeWeight: 1,
			fillColor: '#F89B3B',
			fillOpacity: 0.5
		});

		this.geofence.addListener('click', function () {
			var locationID = "#location" + location.id;
					
			if($("#details").html()){
				
				//Show specific location details				
				$(locationID).click();
				
			}

			//var elm = document.querySelector("#location" + this.id);
			
			//Simulate mouse click
			/*
			var evt = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				view: window
			});

			if (document.querySelector("#details").innerHTML) {
				elm.dispatchEvent(evt);
			}
			*/
		});

		this.setInside = function () {
			this.inside = true;
			//this.marker.setClickable(true);
			//this.marker.setOpacity(1.0);
		};

		this.setOutside = function () {
			this.inside = false;
			//this.marker.setClickable(true);
			//this.marker.setOpacity(1.0);
		};

	},

	//Filter Locations
	filter: function (type) {
		document.getElementById("locations").innerHTML = '';
		document.getElementById("details").innerHTML = '';

		locations.forEach(function(location){
			//map.removeMarker(location.marker);
			map.removePolygon(location.geofence);
		});

		app.getLocations(type);
		map.refresh();

		//Get Current Location	
		navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
	},

	//Display Map
	displayMap: function () {
		document.getElementById("locations").style.display = "none";
		document.getElementById("map").style.visibility = "visible";
		map.refresh();
	},

	//Display List
	displayList: function () {
		document.getElementById("locations").style.display = "inline";
		document.getElementById("map").style.visibility = "hidden";
	}

};

app.initialize();