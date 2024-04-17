import { Color } from "../color"
import { Chess } from "../chess"
import { Tile } from "../tile"

abstract class Piece {
  shortHand: string = " "
  color: Color
  game: Chess

  constructor(color: Color, game: Chess) {
    this.color = color
    this.game = game
  }

  getShorthand() {
    return `${this.shortHand}_${this.color}`
  }

  abstract canMove(start: Tile, end: Tile): boolean
}

export { Piece }