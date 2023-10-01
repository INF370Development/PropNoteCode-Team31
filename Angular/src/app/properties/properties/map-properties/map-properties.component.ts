/*import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { PropertiesService } from 'src/app/services/properties.service';
import * as L from 'leaflet';*/

import { Component, OnInit } from '@angular/core';

declare var Microsoft: any;

//ADDED
interface GeocodeLocation {
  latitude: number;
  longitude: number;
}

interface GeocodeResult {
  results: GeocodeLocation[];
}
//

@Component({
  selector: 'app-map-properties',
  templateUrl: './map-properties.component.html',
  styleUrls: ['./map-properties.component.scss']
})

export class MapPropertiesComponent implements OnInit {
  map: any; 

  //Trying to do it with user input for the coordinates
  streetName: string = '';
  buildingNumber: string = '';
  suburb: string = '';

  //This works
  /*INITIAL_LATITUDE: number = -29.8281; // Replace with your initial latitude
  INITIAL_LONGITUDE: number = 31.0302; // Replace with your initial longitude
  INITIAL_ZOOM: number = 10; // Replace with your initial zoom level
  INITIAL_PROPERTY_LATITUDE: number = -29.8281; // Replace with initial property latitude
  INITIAL_PROPERTY_LONGITUDE: number = 31.0302; // Replace with initial property longitude*/
  
  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = new Microsoft.Maps.Map(document.getElementById('map'), {
      center: new Microsoft.Maps.Location(-29.8281, 31.0302), // Initial center coordinates
      zoom: 10 // Initial zoom level
    });

    const initialPin = new Microsoft.Maps.Pushpin(
      new Microsoft.Maps.Location(-29.8281, 31.0302), // Initial property location
      { title: 'Property' }
    );

    this.map.entities.push(initialPin);
  }

  geocodeAddress(): void {
    const address = `${this.buildingNumber}, ${this.streetName}, ${this.suburb}, Durban, South Africa`;

    // Use Bing Maps geocoding service
    Microsoft.Maps.loadModule('Microsoft.Maps.Search', () => {
      const searchManager = new Microsoft.Maps.Search.SearchManager(this.map);

      const requestOptions = {
        where: address,
        callback: (searchResult: GeocodeResult) => {
          if (searchResult && searchResult.results && searchResult.results.length > 0) {
            const location = searchResult.results[0];
            this.updateMapForProperty(location.latitude, location.longitude, 'User Location');
          } else {
            alert('Location not found. Please check the address.');
          }
        },
        errorCallback: (e: any) => {
          console.error(e);
        }
      };

      const searchRequest = new Microsoft.Maps.Search.GeocodeRequest(requestOptions);
      searchManager.geocode(searchRequest);
    });
  }

  updateMapForProperty(lat: number, lng: number, title: string): void {
    this.map.entities.clear();
    const pin = new Microsoft.Maps.Pushpin(
      new Microsoft.Maps.Location(lat, lng),
      { title: title }
    );

    this.map.entities.push(pin);
  }
}


//CIARA STOP BEING STUPID
//This works
/*INITIAL_LATITUDE: number = -29.8281; // Replace with your initial latitude
INITIAL_LONGITUDE: number = 31.0302; // Replace with your initial longitude
INITIAL_ZOOM: number = 10; // Replace with your initial zoom level
INITIAL_PROPERTY_LATITUDE: number = -29.8281; // Replace with initial property latitude
INITIAL_PROPERTY_LONGITUDE: number = 31.0302; // Replace with initial property longitude

constructor() { }

ngOnInit(): void {
  this.initMap(); 
}

initMap(): void {
  this.map = new Microsoft.Maps.Map(document.getElementById('map'), {
    center: new Microsoft.Maps.Location(this.INITIAL_LATITUDE, this.INITIAL_LONGITUDE),
    zoom: this.INITIAL_ZOOM
  });

  const initialPin = new Microsoft.Maps.Pushpin(
    new Microsoft.Maps.Location(this.INITIAL_PROPERTY_LATITUDE, this.INITIAL_PROPERTY_LONGITUDE),
    { title: 'Property' }
  );

  this.map.entities.push(initialPin);
}

updateMapForProperty(lat: number, lng: number, title: string): void {
  this.map.entities.clear();
  const pin = new Microsoft.Maps.Pushpin(
    new Microsoft.Maps.Location(lat, lng),
    { title: title }
  );

  this.map.entities.push(pin);
}
*/


//THIS DOES NOT WORK

  /*map!: L.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {})
    ],
    zoom: 6,
    center: { lat: -29.0, lng: 24.0 }
  };

  constructor(private propertyService: PropertiesService) {} // Inject your property service here

  async ngOnInit() {
    this.initializeMap();
    this.loadPropertyMarkers();

  // this.map = L.map('map').setView([51.505, -0.09], 13);

  navigator.geolocation.getCurrentPosition((position) => {

  // Success callback
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  console.log('Latitude: ' + lat + ', Longitude: ' + lon);

  // Define the custom icon
  const myIcon = L.icon({
    iconUrl: 'data:image/png;base64,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',
    iconSize: [30, 25], // Set the size of the icon
    iconAnchor: [16, 32], // Set the anchor point of the icon
  });

  const marker = L.marker([position.coords.latitude, position.coords.longitude], {
    icon: myIcon // Pass the custom icon here
  }).addTo(this.map);


  marker.bindPopup("<b>Your Current Location.</b><br />").openPopup();

  this.map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));

  // Use lat and lon as needed
  }, function(error) {
  // Error callback
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    }
    });
  }

  initializeMap() {
    // Initialize your map as you did before
  }

  loadPropertyMarkers() {
    // Fetch property data from your API
    this.propertyService.getProperties().subscribe((properties) => {
      // Iterate through the properties and create markers
      properties.forEach((property, index) => {
        const marker = this.generateMarker(property, index);
        marker.addTo(this.map);
        this.markers.push(marker);
      });
    });
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }
}*/

/*import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-map-properties',
  templateUrl: './map-properties.component.html',
  styleUrls: ['./map-properties.component.scss']
})

export class MapPropertiesComponent implements OnInit {
  map!: Leaflet.Map;

  markers: Leaflet.Marker[] = [];

  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {})
    ],
    zoom: 6,
    center: {lat: -29.0, lng: 24.0}
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  } 

  //Markers
  constructor(private propertyServices: PropertiesService) {}

  ngOnInit() {
    this.propertyServices.getProperties().subscribe(properties => {
      properties.forEach((property, index) => {
        const marker = this.generateMarker(property, index);
        this.markers.push(marker);
        marker.addTo(this.map);
      });
    });
  }
}*/

//import { Component, OnInit  } from '@angular/core';
//import * as L from 'leaflet';

/*import { Component, ViewChild, ElementRef } from '@angular/core';
import H from '@here/maps-api-for-javascript';

const platform = new H.service.Platform({
  apikey: 'ITmSxBeMNi_EMYezwQ5ol7kQJrs5Dy7GEI2fYJ1nFzU',
});*/

/*import { Component, OnInit } from '@angular/core';
import { HereMapsService } from 'src/app/services/here-maps.service';*/

/* KEY:
Access key ID: _R9pnLde3CQ_cZV08c6aLg 
Access key secret: euEUflx6-0Zt54Wj9ymiDsuk_i8VbP4wC7fTuMuITTDJYa-c0kaU1wZml_oBz_DzTblndEk2aY1rUbyp3CHgLw */
//import * as H from '@here/maps-api-for-javascript';

/*constructor() {}
      
    ngOnInit(): void {}
  
    display: any;
    center: google.maps.LatLngLiteral = {
        lat: 22.2736308,
        lng: 70.7512555
    };
    zoom = 6;
  
    /*------------------------------------------
    --------------------------------------------
    moveMap()
    --------------------------------------------
    --------------------------------------------*
    moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  /*------------------------------------------
  --------------------------------------------
  move()
  --------------------------------------------
  --------------------------------------------*
  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  */
  /*private platform: H.service.Platform;

  constructor() {
    this.platform = new H.service.Platform({
      apikey: 'ITmSxBeMNi_EMYezwQ5ol7kQJrs5Dy7GEI2fYJ1nFzU'
    });
  }

  ngOnInit(): void {
    const mapContainer = document.getElementById('mapContainer');
  
    if (mapContainer) { 
      const defaultLayers = this.platform.createDefaultLayers();
      const map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
        center: { lat: 52.5200, lng: 13.4050 }, // Change these coordinates to your desired location
        zoom: 10 // Set the initial zoom level
      });

      // Add map behaviors
      /*const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      const ui = new H.ui.UI(map, { // Use 'new' to create the UI object
        elements: {
          mapsettings: {
            incidents: false
          },
          zoom: true
        }
      });

      const marker = new H.map.Marker({ lat: 52.5200, lng: 13.4050 });
      map.addObject(marker);
    } else {
      console.error('Map container not found.');
    }
  }
}*/

/*constructor(private hereMapsService: HereMapsService) {}

  ngOnInit(): void {
    // Initialize the map when the component is initialized
  }*/
  
/*private map?: H.Map;

  @ViewChild('map') mapDiv?: ElementRef; 

  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: '{YOUR_API_KEY}'
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat: 0, lng: 0},
          zoom: 2,
        },
      );
      this.map = map;
    }
  }*/

  /*constructor() { }

  ngOnInit(): void {
    const map = L.map('map').setView([51.505, -0.09], 13); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }*/