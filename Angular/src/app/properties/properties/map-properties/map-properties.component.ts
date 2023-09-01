import { Component } from '@angular/core';
/*import { Map } from 'ol/Map.js';
import  { OSM } from 'ol/source/OSM.js';
import { TileLayer } from 'ol/layer/Tile.js';
import { View } from 'ol/View.js';*/

@Component({
  selector: 'app-map-properties',
  templateUrl: './map-properties.component.html',
  styleUrls: ['./map-properties.component.scss']
})
export class MapPropertiesComponent {
  /*const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });*/
  
  // Add properties data from your backend here
  properties = [
    { lat: 51.678418, lng: 7.809007, name: 'Property 1' },
    // Add more properties
  ];
}
