import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter();
  /**
   * Text displayed within the button.
   */
  @Input() name = '';

  /**
   * Method trigger upon click event.
   */
  onClick() {
    this.clicked.emit();
  }
}
