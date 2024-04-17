import { Tile } from "../tile.ts";
import { Bishop } from "./bishop.ts";
import { Piece } from "./piece.ts";
import { Rook } from "./rook.ts";

class Queen extends Piece {
  shortHand = "Q";

  canMove(start: Tile, end: Tile): boolean {
    return (
      new Bishop(this.color, this.game).canMove(start, end) ||
      new Rook(this.color, this.game).canMove(start, end)
    );
  }
}

export { Queen };
