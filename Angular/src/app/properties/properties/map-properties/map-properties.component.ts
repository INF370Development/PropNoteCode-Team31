import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

//Leaflet.Icon.Default.imagePath = 'assets/';
/*Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png'
});*/

@Component({
  selector: 'app-map-properties',
  templateUrl: './map-properties.component.html',
  styleUrls: ['./map-properties.component.scss']
})

export class MapPropertiesComponent  {
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 6,
    /*JHB center: { lat: -26.2041, lng: 28.0473 }*/
    center: {lat: -29.0, lng: 24.0}
  }

  /*initMarkers() {
    const initialMarkers = [
      {
        position: { lat: 28.625485, lng: 79.821091 },
        draggable: true
      },
      {
        position: { lat: 28.625293, lng: 79.817926 },
        draggable: false
      },
      {
        position: { lat: 28.625182, lng: 79.81464 },
        draggable: true
      }
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker)
    }
  }*/

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    //this.initMarkers();
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
}

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