import { Tile } from "./tile";
import { Pawn, King, Queen, Knight, Rook, Bishop } from "./piece"
import { Color } from "./color";
import { Chess } from "./chess";

class Board {
  board: Tile[][] = []
  game: Chess

  constructor(game: Chess) {
    this.game = game
    this.init()
  }

  init() {
    // main white pieces
    this.board[0] = [
      new Tile(0, 0, new Rook(Color.WHITE, this.game)),
      new Tile(0, 1, new Knight(Color.WHITE, this.game)),
      new Tile(0, 2, new Bishop(Color.WHITE, this.game)),
      new Tile(0, 3, new Queen(Color.WHITE, this.game)),
      new Tile(0, 4, new King(Color.WHITE, this.game)),
      new Tile(0, 5, new Bishop(Color.WHITE, this.game)),
      new Tile(0, 6, new Knight(Color.WHITE, this.game)),
      new Tile(0, 7, new Rook(Color.WHITE, this.game)),
    ]

    // white pawns
    this.board[1] = []
    for (let c = 0; c < 8; c++) {
      this.board[1][c] = new Tile(1, c, new Pawn(Color.WHITE, this.game))
    }

    // empty tiles
    for (let r = 2; r < 6; r++) {
      this.board[r] = []
      for (let c = 0; c < 8; c++) {
        this.board[r][c] = new Tile(r, c)
      }
    }

    // black pawns
    this.board[6] = []
    for (let c = 0; c < 8; c++) {
      this.board[6][c] = new Tile(6, c, new Pawn(Color.BLACK, this.game))
    }

    // main black pieces
    this.board[7] = [
      new Tile(7, 0, new Rook(Color.BLACK, this.game)),
      new Tile(7, 1, new Knight(Color.BLACK, this.game)),
      new Tile(7, 2, new Bishop(Color.BLACK, this.game)),
      new Tile(7, 3, new Queen(Color.BLACK, this.game)),
      new Tile(7, 4, new King(Color.BLACK, this.game)),
      new Tile(7, 5, new Bishop(Color.BLACK, this.game)),
      new Tile(7, 6, new Knight(Color.BLACK, this.game)),
      new Tile(7, 7, new Rook(Color.BLACK, this.game)),
    ]
  }

  getTile(row: number, column: number): Tile | undefined {
    // outside the board
    if (!(0 <= row && row < 8 && 0 <= column && column < 8)) {
      return undefined
    }
    return this.board[row][column]
  }

  display() {
    console.log()
    console.log("    a   b   c   d   e   f   g   h  ")
    for (let r = 7; r >= 0; r--) {
      let row = `${r + 1} |`
      for (let c = 0; c < 8; c++) {
        row += this.board[r][c].getPieceShorthand() + "|"
      }
      console.log("  +---+---+---+---+---+---+---+---+")
      console.log(row + ` ${r + 1}`)
    }
    console.log("  +---+---+---+---+---+---+---+---+")
    console.log("    a   b   c   d   e   f   g   h  ")
    console.log()
  }

  getTilesByPieceColor(color: Color) {
    const tiles: Tile[] = []
    for (const rowOfTiles of this.board) {
      for (const tile of rowOfTiles) {
        if (!tile.isEmpty() && tile.getPieceColor() === color) {
          tiles.push(tile)
        }
      }
    }
    return tiles
  }

  getAllTiles() {
    const tiles: Tile[] = []
    for (const rowOfTiles of this.board) {
      for (const tile of rowOfTiles) {
        tiles.push(tile)
      }
    }
    return tiles
  }

  getKingTile(color: Color): Tile {
    for (const rowOfTiles of this.board) {
      for (const tile of rowOfTiles) {
        if (!tile.isEmpty() && tile.getPieceColor() === color && tile.piece instanceof King) {
          return tile
        }
      }
    }
    return new Tile(-1, -1)
  }

}

export { Board } 