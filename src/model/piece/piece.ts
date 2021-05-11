import {Coordinate} from "../coordinate";

type Color = 'black' | 'white';

export abstract class Piece {
  public image: string;
  public color: Color;
  public position: Coordinate;
  public validPositions: Coordinate[] = [];

  constructor(color: Color, whiteCoordinate: Coordinate) {
    this.color = color;
    this.position = this.isWhite() ? whiteCoordinate : whiteCoordinate.flipRank();
  }

  isWhite() {
    return this.color === 'white';
  }

  move(to: Coordinate) {
    this.position = to;
  }
}
