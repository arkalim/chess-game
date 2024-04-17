import { Tile } from "../tile"
import { Bishop } from "./bishop"
import { Piece } from "./piece"
import { Rook } from "./rook"

class Queen extends Piece {
  shortHand = "Q"

  canMove(start: Tile, end: Tile): boolean {
    return new Bishop(this.color, this.game).canMove(start, end) || new Rook(this.color, this.game).canMove(start, end)
  }
}

export { Queen }