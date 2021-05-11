import {Piece} from "./piece/piece";
import {Coordinate, Files} from "./coordinate";
import {Pawn} from "./piece/pawn";
import {Rook} from "./piece/rook";
import {Knight} from "./piece/knight";
import {Bishop} from "./piece/bishop";
import {Queen} from "./piece/queen";
import {King} from "./piece/king";

export class Board {
  public occupiedTiles: Coordinate[] = [];
  public pieces: Piece[] = [];

  constructor() {
    this.createPieces();
  }

  getPiece(position: Coordinate) {
    return this.pieces.find(piece => piece.position.file === position.file && piece.position.rank === position.rank);
  }

  addPiece(piece: Piece) {
    if (this.occupiedTiles.find(tile =>
      tile.file === piece.position.file &&
      tile.rank === piece.position.rank)) {
      throw new Error('Tile is already occupied');
    }

    this.occupiedTiles.push(piece.position);

    this.pieces.push(piece);
  }

  addPieces(pieces) {
    pieces.forEach(piece => this.addPiece(piece));
  }

  createPieces() {
    this.createPawns();
    this.createRooks();
    this.createKnights();
    this.createBishops();
    this.createQueen();
    this.createKing();
  }

  private createPawns() {
    const pawnWhitePositions = Files.map(file => new Coordinate(file, 2));
    const whitePawns = pawnWhitePositions.map(pos => new Pawn('white', pos));
    const blackPawns = pawnWhitePositions.map(pos => new Pawn('black', pos));

    this.addPieces(whitePawns);
    this.addPieces(blackPawns);
  }

  private createRooks() {
    const rookWhitePositions = [
      new Coordinate('A', 1),
      new Coordinate('H', 1)
    ];

    const whiteRooks = rookWhitePositions.map(pos => new Rook('white', pos));
    const blackRooks = rookWhitePositions.map(pos => new Rook('black', pos));

    this.addPieces(whiteRooks);
    this.addPieces(blackRooks);
  }

  private createKnights() {
    const knightWhitePositions = [
      new Coordinate('B', 1),
      new Coordinate('G', 1)
    ];

    const whiteKnights = knightWhitePositions.map(pos => new Knight('white', pos));
    const blackKnights = knightWhitePositions.map(pos => new Knight('black', pos));

    this.addPieces(whiteKnights);
    this.addPieces(blackKnights);
  }

  private createBishops() {
    const bishopWhitePositions = [
      new Coordinate('C', 1),
      new Coordinate('F', 1)
    ];

    const whiteBishops = bishopWhitePositions.map(pos => new Bishop('white', pos));
    const blackBishops = bishopWhitePositions.map(pos => new Bishop('black', pos));

    this.addPieces(whiteBishops);
    this.addPieces(blackBishops);
  }

  private createQueen() {
    const queenWhitePosition = new Coordinate('D', 1);

    const whiteQueen = new Queen('white', queenWhitePosition);
    const blackQueen = new Queen('black', queenWhitePosition);

    this.addPieces([whiteQueen, blackQueen]);
  }

  private createKing() {
    const kingWhitePosition = new Coordinate('E', 1);

    const whiteKing = new King('white', kingWhitePosition);
    const blackKing = new King('black', kingWhitePosition);

    this.addPieces([whiteKing, blackKing]);
  }
}
