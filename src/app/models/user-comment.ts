/**
 * Class for typing user comments.
 */
export class UserComment {
  /**
   * Name of the user that left the comment.
   */
  public name: string;
  /**
   * Comment text content.
   */
  public text: string;
  /**
   * Date on which the comment was added.
   */
  public date: string;

  constructor(name: string, text:string, date: string){
      this.name = name;
      this.text = text;
      this.date = date;
  }
}
