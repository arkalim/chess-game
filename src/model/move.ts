import { Position } from "./position";

class Move {
  start: Position
  end: Position

  constructor (start: Position, end: Position) {
    this.start = start
    this.end = end
  }
}

export { Move }