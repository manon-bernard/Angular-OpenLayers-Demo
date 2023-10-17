import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  map: Map;

  constructor(){
    this.map = new Map();
  }

  ngOnInit(): void {
    this.map = new Map({
        view: new View({
          center: [0,0],
          zoom: 1,
        }),
        layers:[
          new TileLayer({
            source: new OSM(),
          })
        ],
        target:'ol-map',
      }
    )
  }

}
