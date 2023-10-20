import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { UserComment } from '../../models/user-comment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent {
  /**
   * List of user comments to display, for the selected spot.
   */
  @Input() comments!: UserComment[];
  @Output() clickedSubmit = new EventEmitter();

  @ViewChild('form', { static: true }) form: any;

  constructor() {}

  getFormData(form: NgForm) {
    const { comment } = form.value;
    let newComment = comment;
    return newComment;
  }

  onClickSubmit(form: NgForm) {
    const data = this.getFormData(form);
    this.clickedSubmit.emit(data);
    form.resetForm();
  }
}
