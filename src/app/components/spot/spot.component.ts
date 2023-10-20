import { Component, Input } from '@angular/core';
import { Spot } from 'src/app/models/spot';
import { UserComment } from 'src/app/models/user-comment';
import { SpotsService } from 'src/app/services/spots/spots.service';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css'],
})
export class SpotDetailsComponent {
  /**
   * Spot element for which displaying the informations.
   */
  @Input() spot: Spot | undefined;

  constructor(private spotsService: SpotsService) {}

  onSubmitNewComment(newComment: string) {
    const newCommentData: UserComment = {
      name: 'John Doe',
      text: newComment as string,
      date: new Date().toLocaleDateString(),
    };

    const spotId = this.spot!.id;
    if (spotId) {
      this.spot!.commentList.push(newCommentData as UserComment);
      this.spotsService.updateSpot(this.spot!).subscribe();
    }
  }
}
