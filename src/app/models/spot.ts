import { UserComment } from "./user-comment";

/**
 * Class for spots data.
 */
export class Spot {
  /**
   * Name of the location.
   */
  public name: string;
  /**
   * Description text content.
   */
  public description: string;
  /**
   * User who added the spot.
   */
    public username: string;
  /**
   * Date on which the spot was added.
   */
  public date: string;
  /**
   * List of tags associated with the spot.
   */
  public tagList: tag[];
  /**
   * List of comments left about this spot.
   */
  public commentList: UserComment[]

  constructor(
    name: string,
    description:string,
    date: string,
    tagList: tag[],
    commentList: UserComment[],
    username: string)
    {
      this.name = name;
      this.description = description;
      this.tagList = tagList;
      this.username = username;
      this.date = date;
      this.commentList = commentList;
  }
}


type tag = 'monument'|'art'|'curiosité'|'nature'|'autre'
