import { Color } from "../color.ts";
import { Chess } from "../chess.ts";
import { Tile } from "../tile.ts";

abstract class Piece {
  shortHand: string = " ";
  color: Color;
  game: Chess;

  constructor(color: Color, game: Chess) {
    this.color = color;
    this.game = game;
  }

  getShorthand() {
    return `${this.shortHand}_${this.color}`;
  }

  abstract canMove(start: Tile, end: Tile): boolean;
}

export { Piece };
