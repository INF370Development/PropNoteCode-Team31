import { Injectable } from '@angular/core';

declare var H: any;

@Injectable({
  providedIn: 'root',
})
export class HereMapsService {
  private map: any;

  constructor() {
    this.initializeMap();
  }

  private initializeMap() {
    const platform = new H.service.Platform({
      apikey: 'ITmSxBeMNi_EMYezwQ5ol7kQJrs5Dy7GEI2fYJ1nFzU', 
    });

    const defaultLayers = platform.createDefaultLayers();
    this.map = new H.Map(
      document.getElementById('map'),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 52.5200, lng: 13.4050 }, 
        zoom: 10,
      }
    );
  }
}
