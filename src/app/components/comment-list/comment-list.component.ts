import { Component } from '@angular/core';
import { UserComment } from '../../models/user-comment'

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
  /**
   * List of user comments to display, for the selected spot.
   */
  comments : UserComment[];

  constructor(){
    this.comments = [
      new UserComment('Anonymous', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, dolore. Optio aperiam iste ipsa fugit nihil itaque consequuntur voluptas perspiciatis, dolores, quibusdam quaerat, eum officia molestias maxime veritatis molestiae error?', '2023-10-05'),
      new UserComment('John Doe', 'lorem ipsum lorem', '2023-06-05'),
      new UserComment('Jane Doe', 'lorem ipsum lorem ispsum m lorem ipsum', '2023-03-05'),
    ]
  }
}
