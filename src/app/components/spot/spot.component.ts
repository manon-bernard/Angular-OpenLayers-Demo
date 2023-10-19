import { Component, Input } from '@angular/core';
import { Spot } from 'src/app/models/spot';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css']
})
export class SpotDetailsComponent {
  @Input() spot!: Spot;
}
