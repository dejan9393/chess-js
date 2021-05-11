import {Board} from "../../src/model/board";
import {Coordinate} from "../../src/model/coordinate";

describe('Board tests', () => {
  it('should create pieces with initial starting positions', () => {
    const board = new Board;

    board.pieces[21].move(new Coordinate('F', 3));
    board.pieces[4].move(new Coordinate('E', 4));
    // board.draw();
  });
});
