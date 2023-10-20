import { Component, OnInit } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { Spot } from 'src/app/models/spot';
import { UserComment } from 'src/app/models/user-comment';
import { SpotsService } from 'src/app/services/spots/spots.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  spotList!: Spot[];
  selectedSpot: Spot | undefined;

  constructor(private spotsService: SpotsService) {}

  /**
   * Method triggered whenever the user click on the map. Recovers the spot from the Map as $event data.
   * @param spotData Name and coordinate recovered from the map.
   */
  onMapClick(spotData: { name: string; coordinates: Coordinate } | undefined) {
    this.spotsService.getSpots().subscribe((spots: Spot[]) => {
      this.spotList = spots;

      // Check if variable is undefined.
      if (spotData) {
        // Identify the spot selected and fetch all associated data.
        this.selectedSpot = this.spotList.find(
          (spot) => spot.name === spotData.name
        )!;
      } else {
        // If there is not existing spot, set the property as undefined.
        this.selectedSpot = undefined;
      }

      console.log(spotData, this.selectedSpot);
    });
  }
}
