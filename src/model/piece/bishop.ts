import { Piece } from "./piece"
import { Tile } from "../tile"

class Bishop extends Piece {
  shortHand = "B"

  canMove(start: Tile, end: Tile): boolean {

    const rowDiff = Math.abs(start.row - end.row)
    const columnDiff = Math.abs(start.column - end.column)

    if (rowDiff !== columnDiff) {
      return false
    }


    if (start.row < end.row && start.column < end.column) {
      for (let i = 1; i < end.row - start.row; i++) {
        if (!(this.game.board.getTile(start.row + i, start.column + i)?.isEmpty())) {
          return false
        }
      }
      return true
    }

    if (start.row > end.row && start.column > end.column) {
      for (let i = 1; i < start.row - end.row; i++) {
        if (!(this.game.board.getTile(start.row - i, start.column - i)?.isEmpty())) {
          return false
        }
      }
      return true
    }

    if (start.row > end.row && start.column < end.column) {
      for (let i = 1; i < start.row - end.row; i++) {
        if (!(this.game.board.getTile(start.row - i, start.column + i)?.isEmpty())) {
          return false
        }
      }
      return true
    }

    if (start.row < end.row && start.column > end.column) {
      for (let i = 1; i < end.row - start.row; i++) {
        if (!(this.game.board.getTile(start.row + i, start.column - i)?.isEmpty())) {
          return false
        }
      }
      return true
    }
    return false
  }
}

export { Bishop }