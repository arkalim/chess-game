import { Color } from "../color.ts";
import { Tile } from "../tile.ts";
import { Piece } from "./piece.ts";
import { Queen } from "./queen.ts";

class Pawn extends Piece {
  shortHand = "P";

  canMove(start: Tile, end: Tile): boolean {
    switch (this.color) {
      case Color.WHITE:
        // move 2 from the start
        if (
          start.row === 1 &&
          start.column === end.column &&
          end.row === 3 &&
          this.game.board.getTile(2, end.column)?.isEmpty() &&
          this.game.board.getTile(3, end.column)?.isEmpty()
        ) {
          return true;
        }

        // move 1 from anywhere
        if (
          start.column === end.column &&
          end.row === start.row + 1 &&
          this.game.board.getTile(end.row, end.column)?.isEmpty()
        ) {
          return true;
        }

        // kill a black piece
        if (
          end.row === start.row + 1 &&
          end.getPieceColor() === Color.BLACK &&
          (end.column === start.column + 1 || end.column === start.column - 1)
        ) {
          return true;
        }
        break; // to prevent fall through

      case Color.BLACK:
        // move 2 from the start
        if (
          start.row === 6 &&
          start.column === end.column &&
          end.row === 4 &&
          this.game.board.getTile(5, end.column)?.isEmpty() &&
          this.game.board.getTile(4, end.column)?.isEmpty()
        ) {
          return true;
        }

        // move 1 from anywhere
        if (
          start.column === end.column &&
          end.row === start.row - 1 &&
          this.game.board.getTile(end.row, end.column)?.isEmpty()
        ) {
          return true;
        }

        // kill a white piece
        if (
          end.row === start.row - 1 &&
          end.getPieceColor() === Color.WHITE &&
          (end.column === start.column + 1 || end.column === start.column - 1)
        ) {
          return true;
        }
    }
    return false;
  }

  promote(tile: Tile) {
    if (tile.piece === this) {
      if (
        (this.color === Color.WHITE && tile.row === 7) ||
        (this.color === Color.BLACK && tile.row === 0)
      ) {
        tile.piece = new Queen(this.color, this.game);
      }
    }
  }
}

export { Pawn };
