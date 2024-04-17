import { Color } from "./color.ts";
import { Piece } from "./piece/index.ts";

class Tile {
  row: number;
  column: number;
  piece: Piece | undefined;

  constructor(row: number, column: number, piece?: Piece | undefined) {
    this.row = row;
    this.column = column;
    this.piece = piece;
  }

  getPieceShorthand(): string {
    if (this.piece) {
      return this.piece.getShorthand();
    }
    return "   ";
  }

  isEmpty(): boolean {
    return this.piece === undefined;
  }

  getPieceColor(): Color | undefined {
    return this.piece?.color;
  }
}

export { Tile };
