import {Coordinate} from "../coordinate";

export type TileColor = 'black' | 'white';

export class Tile {
  position: Coordinate;
  color: TileColor;

  constructor(color, position) {
    this.color = color;
    this.position = position;
  }
}
