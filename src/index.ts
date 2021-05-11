import {Board} from './model/board';
import {BoardCanvas} from "./model/canvas/board-canvas";

const board = new Board;

document.addEventListener('DOMContentLoaded', () => {
  console.log("document ready");

  const canvas = document.querySelector('canvas');
  canvas.height = 800;
  canvas.width = 800;

  const boardCanvas = new BoardCanvas(canvas, board);
  boardCanvas.draw();
});
