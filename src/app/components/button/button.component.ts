import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  /**
   * Text displayed within the button.
   */
  @Input() name = ''

}
