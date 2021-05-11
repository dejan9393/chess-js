import {Coordinate, Files, Ranks} from "../coordinate";
import {Piece} from "../piece/piece";

import {loadImage} from 'canvas';
import {Board} from "../board";
import {Tile, TileColor} from "./tile";

const BLACK = '#d28c45';
const WHITE = '#ffcfa0';

export class BoardCanvas {
  board: Board;
  canvas: HTMLCanvasElement;
  tiles: Tile[] = [];

  constructor(canvas: HTMLCanvasElement, board: Board) {
    this.canvas = canvas;
    this.board = board;

    this.setupListeners();
  }

  get tileSize() {
    return this.canvas.height / 8;
  }

  get context() {
    return this.canvas.getContext('2d');
  }

  setupListeners() {
    const canvasLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
    const canvasTop = this.canvas.offsetTop + this.canvas.clientTop;

    let selectedPiece;

    this.canvas.addEventListener('click', event => {
      const x = event.pageX - canvasLeft,
        y = event.pageY - canvasTop;

      const rank = Math.ceil(y / this.tileSize) as any;
      const file = String.fromCharCode(Math.ceil(x / this.tileSize) + 64) as any;

      let clickedPosition = new Coordinate(file, rank);

      if (selectedPiece) {
        this.movePiece(selectedPiece, clickedPosition);
        selectedPiece = null;

        return;
      }

      selectedPiece = this.board.getPiece(clickedPosition);
      console.log(selectedPiece);

    }, false);
  }

  coordinateToBoardPosition(coordinate: Coordinate) {
    const x = (coordinate.file.charCodeAt(0) % 65) * this.tileSize;
    const y = (coordinate.rank - 1) * this.tileSize;

    return {x, y};
  }

  async draw() {
    // ctx.translate(ctx.canvas.width * 0.5, ctx.canvas.height * 0.5);
    // ctx.rotate(180 * Math.PI / 180);
    // ctx.translate(-ctx.canvas.width * 0.5, -ctx.canvas.height * 0.5);

    this.drawTiles();
    this.drawPieces();

    // console.log(`<img src="${canvas.toDataURL()}" />`);
  }

  drawTiles() {
    let color: TileColor = 'black';

    const flipColor = color => color === 'black' ? 'white' : 'black';

    Files.forEach(file => {
      Ranks.forEach(rank => {
        const position = new Coordinate(file, rank);
        const tile = this.drawTile(color, position);
        this.tiles.push(tile);

        color = flipColor(color);
      });

      color = flipColor(color);
    });
  }

  drawTile(color: TileColor, position: Coordinate): Tile {
    const tile = new Tile(color, position);

    const pos = this.coordinateToBoardPosition(position);

    this.context.fillStyle = color === 'black' ? BLACK : WHITE;
    this.context.fillRect(pos.x, pos.y, this.tileSize, this.tileSize);

    return tile;
  }

  async drawPieces() {
    for (let piece of this.board.pieces) {
      this.drawPiece(piece);
    }
  }

  async drawPiece(piece: Piece) {
    const pos = this.coordinateToBoardPosition(piece.position);
    const color = piece.color;

    const x = pos.x + 2.5;
    const y = pos.y + 2.5;

    const imageFilename = piece.image;
    const filePath = `images/pieces/${color}/${imageFilename}`;
    const image = await loadImage(filePath) as any;

    // ctx.save();
    // ctx.scale(1, -1);
    // ctx.drawImage(image, x, (y * -1) - tileSize, tileSize - 5, tileSize - 5);
    this.context.drawImage(image, x, y, this.tileSize - 5, this.tileSize - 5);
  }

  getTileAtPosition(position: Coordinate): Tile {
    return this.tiles.find(tile => tile.position.file === position.file && tile.position.rank === position.rank);
  }

  clearTile(position: Coordinate) {
    const tile = this.getTileAtPosition(position);

    this.drawTile(tile.color, tile.position);
  }

  movePiece(piece: Piece, position: Coordinate) {
    const isValidMove = (piece, position) => piece.validPositions.find(pos => position.file === pos.file && position.rank === pos.rank);
    if (!isValidMove(piece, position)) {
      console.warn("That's not a valid position to move to");

      return;
    }

    this.clearTile(piece.position);
    this.clearTile(position);
    piece.move(position);
    this.drawPiece(piece);
  }
}
