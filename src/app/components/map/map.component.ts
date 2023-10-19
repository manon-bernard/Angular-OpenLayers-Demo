import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';

import { useGeographic } from 'ol/proj';
import { Spot } from 'src/app/models/spot';
import { Coordinate } from 'ol/coordinate';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService]
})
export class MapComponent implements OnInit{

  /**
   * Clicked spot, can be undefined.
   */
  selectedSpot!: {name: string, coordinates: Coordinate} | undefined
  /**
   * List of registered spots with their associated informations.
   */
  @Input() spots!: Spot[];
  /**
   * Event Emitter to manage a click on the map.
   */
  @Output() mapClicked = new EventEmitter<{name: string, coordinates: Coordinate} | undefined>()


  // Creating a private property named mapService, injecting the MapService class.
  // On map component construction, create an instance of the mapService service to be used in the map component only (private).
  constructor(private mapService: MapService){}

  ngOnInit(){
    useGeographic(); // Required to use coordinates.

    // Map Init
    this.mapService.createMap();

    // User Location Init
    this.mapService.updateUserLocation();

    // Existing spots Init.
    this.mapService.showSpots(this.spots);

    // Clicks Listener.
    this.mapService.listenSpotOnClick()
  }

  /**
   * Method bound to the click event on the map.
   * Triggers the search for an associated spot, in order to pass it to the main component.
   * Event Emitter.
   */
  onClick(){
    const spot = this.mapService.getSelectedSpot();
    this.mapClicked.emit(spot)
  }

}
