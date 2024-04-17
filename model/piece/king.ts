import { Piece } from "./piece.ts"
import { Tile } from "../tile.ts"

class King extends Piece {
  shortHand = "K"

  canMove(start: Tile, end: Tile): boolean {
    // if the destination box is not 1 tile away
    if (Math.max(Math.abs(start.row - end.row), Math.abs(start.column - end.column)) !== 1) {
      return false
    }
    return true
  }
}

export { King }