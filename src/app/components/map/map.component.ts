import { Component, OnInit } from '@angular/core';

// OL imports.
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
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  /**
   * Map object.
   */
  private map!: Map;
    /**
   * User location, array of number. Default to Paris coordinates.
   */
  private userLocation: Coordinate = [2.349014, 48.864716];
  /**
   * Layer for positionning the user marker on the map.
   */
  private userMarkerLayer!: VectorLayer<VectorSource>;
  /**
   * Geolocation object, that will allow to get the user position.
   */
  private geolocation!: Geolocation

  /**
   * Lifecycle hooks triggered on map component initialisation.
   */
  ngOnInit(): void {
    useGeographic(); //! Required to use coordinates.
    this.createMap();
    this.updateUserLocation();
  }

  /**
   * Method responsible for creating the Map object and displaying it in the Map component.
   */
  createMap(): void {
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

  /**
   * Method responsible for Map Center coordinates update.
   * @param coordinates Array of number / Coordinates, representing the current user location.
   */
  updateMapCenter(coordinates: Coordinate):void{
    this.map.getView().setCenter(coordinates);
  }

  /**
   * Method responsible for updating both user location property (on change) and user marker location when the user geolocation changes.
   */
  updateUserLocation() {

    // Initialize a new object geolocation, an allow user position tracking.
    this.geolocation = new Geolocation({
      tracking:true,
    })

    // Listen to user position changes, and if so triggers a callback that get the user location (coordinates)
    // - If user location fetching respond with an error or undefined, set the user location to Paris.
    // - If user location is defined, set the user location property to that value and set the marker position accordingly.
    this.geolocation.on('change:position', () => {
      const userLocation: Coordinate | undefined = this.geolocation.getPosition();
      if (userLocation) {
        //console.log('Geolocation:', userLocation);
        this.userLocation = userLocation;
        this.updateMapCenter(this.userLocation);
        this.updateUserMarker(this.userLocation);
      } else {
        //console.log('Geolocation not available or permission denied. Centering on Paris.');
        this.userLocation = [2.349014, 48.864716];
        this.updateMapCenter(this.userLocation);
        this.updateUserMarker(this.userLocation);
      }
    });
  }

  /**
   * Method responsible for updating the user marker position on the map.
   * @param coordinates Array of number / Coordinates, representing the current user location.
   */
  updateUserMarker(coordinates: Coordinate) {
    // Reset User Marker Layer (remove previous marker)
    if (this.userMarkerLayer) {
    this.map.removeLayer(this.userMarkerLayer);
    }
    // Initialize a new vector layer for displaying User Marker, set features as Point, define marker style.
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

    // Update the layer with the newly created marker.
    this.userMarkerLayer = userMarkerLayer;
    // Add the layer to the map to be displayed in the map component.
    this.map.addLayer(this.userMarkerLayer);
  }

}
