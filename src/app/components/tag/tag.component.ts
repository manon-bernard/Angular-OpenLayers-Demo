import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
  /**
   * Text displayed in the tag.
   */
  @Input() tagName = '';

  /**
   * Tag background color, linked to category.
   */
  backgroundColor = '';

  /**
   * Method returning the button background color as a string (hexadecimal color code), depending on the tagName value.
   * @returns Button background color
   */
  getBackgroundColor() {
    switch (this.tagName) {
      case 'Art':
        this.backgroundColor = '#3C38A0';
        break;
      case 'Monument':
        this.backgroundColor = '#8E4619';
        break;
      case 'Nature':
        this.backgroundColor = '#5E8E17';
        break;
      case 'Curiosité':
        this.backgroundColor = '#CB3E82';
        break;
      default:
        this.backgroundColor = '#383838';
        break;
    }

    return this.backgroundColor;
  }
}
