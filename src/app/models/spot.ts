import { Coordinate } from 'ol/coordinate';
import { UserComment } from './user-comment';

/**
 * Class for spots data.
 */
export class Spot {
  /**
   * Name of the location.
   */
  public id: number;
  /**
   * Name of the location.
   */
  public name: string;
  /**
   * Description text content.
   */
  public coordinates: Coordinate;
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
  public commentList: UserComment[];

  constructor(
    coordinates: Coordinate,
    name: string,
    description: string,
    username: string,
    date: string,
    tagList: tag[],
    commentList: UserComment[],
    id: number
  ) {
    (this.id = id), (this.coordinates = coordinates);
    this.name = name;
    this.description = description;
    this.username = username;
    this.date = date;
    this.commentList = commentList;
    this.tagList = tagList;
  }
}

type tag = 'monument' | 'art' | 'curiosité' | 'nature' | 'autre';
