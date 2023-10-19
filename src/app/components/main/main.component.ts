import { Component } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { Spot } from 'src/app/models/spot';
import { UserComment } from 'src/app/models/user-comment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  spotList!: Spot[];
  selectedSpot: Spot | undefined;

  constructor(){
    this.spotList = [
      new Spot(
        [5.049640179557884, 45.044852676867755],'Tour Jacquemart', 'La tour Jacquemart de Romans-sur-Isère est une ancienne tour du premier rempart de la ville construit aux XIᵉ et XIIᵉ siècles. Elle est choisie pour accueillir, au XVᵉ siècle, un automate marteleur qui donne l heure : le Jacquemart.', 'John Doe',     '2023-10-17', ['monument'], [new UserComment('John Doe', 'Très belle tour!', '2023-10-17')],
        ),

      new Spot([5.055982442472704, 45.04473810315999],'Escarpin Etoilé', 'Escarpin en soie rouge imprimée de petites étoiles dorées. Andréa Pfister', 'John Doe', '2023-10-17', ['art'], [new UserComment('John Doe', 'Très belle chaussure!', '2023-10-17')]),

      new Spot([5.04920859876103, 45.042443868177855],'Collégiale Saint-Barnard', 'Abbaye de Saint-Barnard', 'John Doe', '2023-10-17', ['monument'], [new UserComment('John Doe', 'Très belle abbaye!', '2023-10-17')]),
    ]
  }

  /**
   * Method triggered whenever the user click on the map. Recovers the spot from the Map as $event data.
   * @param spotData Name and coordinate recovered from the map.
   */
  onMapClick(spotData: {name:string, coordinates: Coordinate} | undefined){
      // Check if variable is undefined.
      if (spotData) {
        // Identify the spot selected and fetch all associated data.
        this.selectedSpot = this.spotList.find((spot) => spot.name === spotData.name)!
      } else {
        // If there is not existing spot, set the property as undefined.
        this.selectedSpot = undefined;
      }

  }
}
