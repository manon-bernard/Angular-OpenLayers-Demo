import { Component, Input } from '@angular/core';
import { UserComment } from 'src/app/models/user-comment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent {
  /**
   * Comment displayed as a list item, for the spot selected.
   */
  @Input() comment: UserComment;

  constructor(){
    this.comment = new UserComment('', '', '')
  }
}
