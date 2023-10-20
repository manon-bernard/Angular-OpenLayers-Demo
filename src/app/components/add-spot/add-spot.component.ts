import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Coordinate } from 'ol/coordinate';
import { UserComment } from 'src/app/models/user-comment';

@Component({
  selector: 'app-add-spot',
  templateUrl: './add-spot.component.html',
  styleUrls: ['./add-spot.component.css'],
})
export class AddSpotComponent {
  /**
   * Event emitted whenever clicking submit.
   */
  @Output() clickedSubmit = new EventEmitter();
  /**
   * Event emitted whenever clicking cancel.
   */
  @Output() clickedCancel = new EventEmitter();
  /**
   * Latitude
   */
  @Input() lat!: number;
  /**
   * Longitude
   */
  @Input() long!: number;

  @ViewChild('form', { static: true }) form: any;

  /**
   * Method to get the form data.
   * @param form Form Element.
   * @returns Form Data Object.
   */
  getFormData(form: NgForm) {
    const { art, monument, curiosite, nature, autre } = form.value;
    let tagList = [];
    if (art) tagList.push('art');
    if (monument) tagList.push('monument');
    if (nature) tagList.push('nature');
    if (curiosite) tagList.push('curiosite');
    if (autre) tagList.push('autre');

    let data = {
      name: form.value.name as string,
      description: form.value.description as string,
      coordinates: [form.value.long, form.value.lat] as Coordinate,
      date: new Date(),
      username: 'John Doe',
      tagList,
      commentList: [] as UserComment[],
    };
    return data;
  }

  /**
   * Method to use when submitting the form data.
   * @param form Form Element.
   */
  onClickSubmit(form: NgForm) {
    const data = this.getFormData(form);
    this.clickedSubmit.emit(data);
    form.resetForm();
  }

  /**
   * Method clicked whenever clicking cancel, while displaying the add-spot component.
   */
  onClickCancel() {
    this.clickedCancel.emit();
  }
}
