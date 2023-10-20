import { Injectable } from '@angular/core';

// OL imports.
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Geolocation from 'ol/Geolocation.js';
import { Coordinate } from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature, Overlay } from 'ol';
import Point from 'ol/geom/Point';
import { Circle, Fill, Stroke, Style } from 'ol/style.js';
import { Spot } from 'src/app/models/spot';
import { Geometry } from 'ol/geom';
import { SpotsService } from '../spots/spots.service';

// The map service is managing the whole logic:
// - Displaying the map with the user coordinates/marker
// - Tracking geolocation changes and updating the map.

@Injectable({
  providedIn: 'root',
})
export class MapService {
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
  private geolocation!: Geolocation;
  /**
   * Layer for positionning the spots marker on the map.
   */
  private spotLayer!: VectorLayer<VectorSource>;
  /**
   * Source for positionning the spots marker on the map.
   */
  private spotSource!: VectorSource;
  /**
   * Spot selected.
   */
  spot!: { name: string; coordinates: Coordinate } | undefined;
  /**
   * Spot coordinate when adding a new spot.
   */
  newSpotCoordinate: Coordinate | undefined;

  /**
   * Method responsible for creating the Map object and displaying it in the Map component.
   */
  createMap(): void {
    this.map = new Map({
      target: 'ol-map',
      view: new View({
        center: this.userLocation,
        zoom: 13,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });
  }

  /**
   * Method responsible for Map Center coordinates update.
   * @param coordinates Array of number / Coordinates, representing the current user location.
   */
  private updateMapCenter(coordinates: Coordinate): void {
    this.map.getView().setCenter(coordinates);
  }

  /**
   * Method responsible for updating both user location property (on change) and user marker location when the user geolocation changes.
   */
  updateUserLocation() {
    // Initialize a new object geolocation, an allow user position tracking.
    this.geolocation = new Geolocation({
      tracking: true,
    });

    // Listen to user position changes, and if so triggers a callback that get the user location (coordinates)
    // - If user location fetching respond with an error or undefined, set the user location to Paris.
    // - If user location is defined, set the user location property to that value and set the marker position accordingly.
    this.geolocation.once('change:position', () => {
      const userLocation: Coordinate | undefined =
        this.geolocation.getPosition();

      //! To rework.
      if (userLocation) {
        // console.log('Geolocation:', userLocation);
        this.userLocation = userLocation;
      } else {
        // console.log('Geolocation not available or permission denied. Centering on Paris.');
        this.userLocation = [2.349014, 48.864716];
      }
      this.updateMapCenter(this.userLocation);
      this.updateUserMarker(this.userLocation);
    });
  }

  constructor(private spotsService: SpotsService) {}
  /**
   * Method responsible for updating the user marker position on the map.
   * @param coordinates Array of number / Coordinates, representing the current user location.
   */
  private updateUserMarker(coordinates: Coordinate) {
    // Reset User Marker Layer (remove previous marker)
    if (this.userMarkerLayer) {
      this.map.removeLayer(this.userMarkerLayer);
    }

    // Initialize a new vector layer for displaying User Marker, set features as Point, define marker style.
    const userMarkerLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(coordinates),
          }),
        ],
      }),
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
        }),
      }),
    });

    // Update the layer with the newly created marker.
    this.userMarkerLayer = userMarkerLayer;

    // Add the layer to the map to be displayed in the map component.
    this.map.addLayer(this.userMarkerLayer);
  }

  /**
   * Method allowing the creation of a vector layer displaying all the spots on the map.
   * @param spots Array of objects representing the lists of spots to display on the map.
   */
  showSpots() {
    // Init spotList as an empty array.
    let spotList = [] as Spot[];

    // Async request for spot list.
    this.spotsService.getSpots().subscribe((spots) => {
      spotList = spots;

      // FeaturesList creation.
      const featuresList: Feature<Geometry>[] = [];
      spotList.forEach((spot) => {
        const newSpot = new Feature({ geometry: new Point(spot.coordinates) });
        featuresList.push(newSpot);
        newSpot.setProperties({
          name: spot.name,
        });
      });

      const spotLayer = new VectorLayer({
        source: new VectorSource({
          features: featuresList,
        }),
        style: new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({
              color: '#CD5C08',
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 2,
            }),
          }),
        }),
      });

      this.spotLayer = spotLayer;
      this.spotSource = spotLayer.getSource()!;

      this.map.addLayer(this.spotLayer);
      this.map.getView();
    });
  }

  /**
   * Method triggering an event listenner for clicks on the existing map.
   * Return an object with the spot data, if a feature is available near the pixel clicked.
   */
  listenSpotOnClick() {
    this.map.on('click', (event) => {
      // Check available features on the pixel clicked:
      // - Return undefined if no marker
      // - Return a Feature<Point> object if a marker is there.
      const feature: Feature<Point> | undefined =
        this.map.forEachFeatureAtPixel(
          event.pixel,
          (feature) => feature as Feature<Point>
        );

      if (feature) {
        // Extract the Point Object, to allow fetching of coordinates.
        const featurePoint: Point | undefined = feature!.getGeometry();

        // Extract Point Feature Data
        const name = feature!.get('name');
        const coordinates = featurePoint!.getCoordinates();
        name && coordinates
          ? (this.spot = { name, coordinates })
          : (this.spot = undefined);
      }
    });
  }

  /**
   * Method allowing to get back the spot clicked data or undefined.
   * @returns Spot selected informations (name, coordinates)
   */
  getSelectedSpot() {
    return this.spot;
  }

  /**
   * Method triggering an event listenner for double clicks on the existing map.
   */
  listenSpotOnDblClick() {
    this.map.on('dblclick', (event) => {
      const coordinates = this.map.getCoordinateFromPixel(event.pixel);
      this.newSpotCoordinate = coordinates;
    });
  }

  /**
   * Method returning the coordinates for the spot newly created.
   * @returns
   */
  getNewSpotCoordinates() {
    return this.newSpotCoordinate;
  }

  /**
   * Method allowing to create a new spot as a Feature and a Point on the map.
   * Adding a spot is currntly not permanent (mock list of spots)
   * @param data Data reovered from submitting the form.
   */
  createNewSpot(spots: Spot[], data: Spot) {
    const newSpot = new Feature({ geometry: new Point(data.coordinates) });
    newSpot.setProperties({
      name: data.name,
    });
    this.spotSource.addFeature(newSpot);

    // ! Fix the new spot click (update spotList)
  }
}
