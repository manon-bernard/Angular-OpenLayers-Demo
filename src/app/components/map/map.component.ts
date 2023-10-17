import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Geolocation from 'ol/Geolocation.js';
import { Coordinate } from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import {Circle, Fill, Stroke, Style} from 'ol/style.js';
import {useGeographic} from 'ol/proj.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  map = new Map();
  userLocation: Coordinate = [2.349014, 48.864716] // Paris Default
  userMarkerLayer = new VectorLayer();
  geolocation = new Geolocation({
    tracking:true,
    trackingOptions: {
      enableHighAccuracy: true,
    },
  })

  ngOnInit(): void {
    useGeographic(); // To use coordinates.
    console.log(this.userLocation)
    this.createMap();
    this.updateUserLocation();
    console.log(this.userLocation)
  }

  createMap(): void {
    console.log('init')
    this.map = new Map({
      target:'ol-map',
      view: new View({
        center: this.userLocation,
        zoom: 13,
      }),
      layers:[
        new TileLayer({
          source: new OSM(),
        })
      ]
    })
  }

  updateMapCenter(coordinates: Coordinate):void{
    this.map.getView().setCenter(coordinates);
  }

  updateUserLocation() {

    this.geolocation.on('change:position', () => {
      const userLocation: Coordinate | undefined = this.geolocation.getPosition();
      console.log('test', userLocation);

      if (userLocation) {
        console.log('user location changed', userLocation);
        this.userLocation = userLocation;
        this.updateMapCenter(this.userLocation);
        this.updateUserMarker(this.userLocation)
      } else {
        console.log('Geolocation not available or permission denied. Centering on Paris.');
        this.userLocation = [2.349014, 48.864716]; // Paris coordinates
        this.updateMapCenter(this.userLocation);
      }

    });
  }

    updateUserMarker(coordinates: Coordinate) {
      console.log(coordinates)
      if (this.userMarkerLayer) {
      this.map.removeLayer(this.userMarkerLayer);
      }

      const userMarkerLayer = new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new Point(coordinates)
            })
          ]}),
        style: new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({
              color: '#3399CC',
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 2,
            }),
          })
        })
      });

      this.userMarkerLayer = userMarkerLayer;
      this.map.addLayer(this.userMarkerLayer);
    }

}
