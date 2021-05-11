import {Piece} from "./piece";
import {Coordinate, Rank} from "../coordinate";

export class Pawn extends Piece {
  public image = 'pawn.png';

  constructor(color, whiteCoordinate) {
    super(color, whiteCoordinate);

    this.validPositions = this.getValidPositions();
  }

  getValidPositions() {
    let rank: Rank = this.position.rank;

    let increment = this.isWhite() ? 1 : -1;
    let moves = 1;

    if (this.isSecondRank()) {
      // Add 1 move
      moves = 2;
    }

    const valid = [];
    for (let i = 0; i < moves; i++) {
      rank = rank + increment as Rank

      if (rank < 9 && rank > 0) {
        valid.push(new Coordinate(this.position.file, rank));
      }
    }

    return valid;
  }

  move(to: Coordinate) {
    super.move(to);

    let rank: Rank = this.position.rank;

    let increment = this.isWhite() ? 1 : -1;

    rank = rank + increment as Rank

    if (rank < 9 && rank > 0) {
      this.validPositions = this.getValidPositions();
    }
  }

  isSecondRank() {
    return this.isWhite() ? this.position.rank === 2 : this.position.rank === 7;
  }
}
