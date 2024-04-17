import { Tile } from "../tile"
import { Piece } from "./piece"

class Knight extends Piece {
  shortHand = "N"

  canMove(start: Tile, end: Tile): boolean {
    for (const [dr, dc] of [[2, 1], [1, 2], [-2, -1], [-1, -2], [2, -1], [1, -2], [-2, 1], [-1, 2]]) {
      if (start.row + dr === end.row && start.column + dc === end.column) {
        return true
      }
    }
    return false
  }
}

export { Knight }