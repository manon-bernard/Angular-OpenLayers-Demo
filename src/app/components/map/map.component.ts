import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';

import { useGeographic } from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService]
})
export class MapComponent {

  // Creating a private property named mapService, injecting the MapService class.
  // On map component construction, create an instance of the mapService service to be used in the map component only (private).
  constructor(private mapService: MapService){}

  ngOnInit(){
    useGeographic(); //! Required to use coordinates.
    this.mapService.createMap();
    this.mapService.updateUserLocation();
  }


}
