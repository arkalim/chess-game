import { Tile } from "../tile.ts";
import { Piece } from "./piece.ts";

class Rook extends Piece {
  shortHand = "R";

  canMove(start: Tile, end: Tile): boolean {
    if (start.row === end.row) {
      if (start.column < end.column) {
        for (let c = start.column + 1; c < end.column; c++) {
          if (!this.game.board.getTile(start.row, c)?.isEmpty()) {
            return false;
          }
        }
        return true;
      } else if (start.column > end.column) {
        for (let c = end.column + 1; c < start.column; c++) {
          if (!this.game.board.getTile(start.row, c)?.isEmpty()) {
            return false;
          }
        }
        return true;
      }
    }
    if (start.column === end.column) {
      if (start.row < end.row) {
        for (let r = start.row + 1; r < end.row; r++) {
          if (!this.game.board.getTile(r, start.column)?.isEmpty()) {
            return false;
          }
        }
        return true;
      } else if (start.row > end.row) {
        for (let r = end.row + 1; r < start.row; r++) {
          if (!this.game.board.getTile(r, start.column)?.isEmpty()) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }
}

export { Rook };
