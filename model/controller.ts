import { Chess } from "./chess.ts";
import { Color } from "./color.ts";
import { Player } from "./player.ts";
import { Position } from "./position.ts";
import { State } from "./state.ts";
import { Tile } from "./tile.ts";

class Controller {
  game: Chess;

  currentPlayer: Player;
  currentColor: Color;
  opponentColor: Color;

  check = false;

  constructor(game: Chess) {
    this.game = game;
    this.currentColor = Color.WHITE;
    this.opponentColor = Color.BLACK;
    this.currentPlayer = this.game.whitePlayer;
  }

  movePiece(startTile: Tile, endTile: Tile) {
    const originalEndTile = endTile.piece;
    endTile.piece = startTile.piece;
    startTile.piece = undefined;

    return originalEndTile;
  }

  pieceCanMove(startTile: Tile | undefined, endTile: Tile | undefined) {
    // movement outside the board
    if (startTile === undefined || endTile === undefined) {
      return false;
    }

    // startTile is empty
    if (startTile.isEmpty()) {
      return false;
    }

    // no movement
    if (startTile === endTile) {
      return false;
    }

    // moving to kill own piece
    if (startTile.getPieceColor() == endTile.getPieceColor()) {
      return false;
    }

    return startTile.piece!.canMove(startTile, endTile);
  }

  stalemate() {
    const opponentTiles = this.game.board.getTilesByPieceColor(
      this.opponentColor
    );

    // for every opponent's piece left on the board
    for (const opponentTile of opponentTiles) {
      // for every tile on the board
      for (const tile of this.game.board.getAllTiles()) {
        // if the opponent's piece can move to the tile
        if (opponentTile !== tile && this.pieceCanMove(opponentTile, tile)) {
          // if the king is safe after the move, it's not a stalemate
          if (!this.moveKillsOpponentKing(opponentTile, tile)) {
            return false;
          }
        }
      }
    }

    // if every valid move kills the king, it's a stalemate
    return true;
  }

  currentCheck(): boolean {
    // check if the current king is getting killed
    const opponentTiles = this.game.board.getTilesByPieceColor(
      this.opponentColor
    );
    for (const opponentTile of opponentTiles) {
      if (
        opponentTile.piece?.canMove(
          opponentTile,
          this.game.board.getKingTile(this.currentColor)
        )
      ) {
        return true;
      }
    }
    return false;
  }

  opponentCheck(): boolean {
    // check if the opponent king is getting killed
    const currentTiles = this.game.board.getTilesByPieceColor(
      this.currentColor
    );
    for (const currentTile of currentTiles) {
      if (
        currentTile.piece?.canMove(
          currentTile,
          this.game.board.getKingTile(this.opponentColor)
        )
      ) {
        return true;
      }
    }
    return false;
  }

  moveKillsCurrentKing(startTile: Tile, endTile: Tile): boolean {
    // temporarily move the piece
    const temp = this.movePiece(startTile, endTile);

    // check if the current king is getting killed after the move
    const currentCheck = this.currentCheck();

    // reset the move
    startTile.piece = endTile.piece;
    endTile.piece = temp;

    return currentCheck;
  }

  moveKillsOpponentKing(startTile: Tile, endTile: Tile): boolean {
    // temporarily move the piece
    const temp = this.movePiece(startTile, endTile);

    // check if the opponent king is getting killed after the move
    const opponentCheck = this.opponentCheck();

    // reset the move
    startTile.piece = endTile.piece;
    endTile.piece = temp;

    return opponentCheck;
  }

  move(player: Player, start: Position, end: Position): boolean {
    // incorrent player played
    if (player !== this.currentPlayer) {
      return false;
    }

    // player playing opponent's pieces
    if (
      (this.currentPlayer == this.game.whitePlayer &&
        this.game.board.getTile(start.row, start.column)?.getPieceColor() !=
          Color.WHITE) ||
      (this.currentPlayer == this.game.blackPlayer &&
        this.game.board.getTile(start.row, start.column)?.getPieceColor() !=
          Color.BLACK)
    ) {
      return false;
    }

    // get tiles
    const startTile = this.game.board.getTile(start.row, start.column);
    const endTile = this.game.board.getTile(end.row, end.column);

    // check if piece can move to the endTile
    if (this.pieceCanMove(startTile, endTile)) {
      // check if the current move gets the current king killed in the next move
      if (this.moveKillsCurrentKing(startTile!, endTile!)) {
        console.log(">>> Invalid move!");
        return false;
      }

      // if the king is not getting killed after the current move, check is resolved
      if (this.check) {
        this.check = false;
      }

      // make the move
      this.movePiece(startTile!, endTile!);

      // check if the move resulted in stalemate and check for the opponent
      const stalemate = this.stalemate();
      const opponentCheck = this.opponentCheck();

      // if the move resulted in stalemate
      if (stalemate) {
        // if the move resulted in both stalemate and check for the opponent, it's a checkmate
        if (opponentCheck) {
          this.game.state =
            this.currentColor === Color.WHITE
              ? State.WHITE_WON
              : State.BLACK_WON;
          // otherwise, it is just a stalemate
        } else {
          this.game.state = State.STALEMATE;
        }
        return true;
      }

      // not a stalemate, just opponent check
      if (opponentCheck) {
        this.check = true;
      }

      // update current player
      this.currentPlayer =
        this.currentPlayer === this.game.whitePlayer
          ? this.game.blackPlayer
          : this.game.whitePlayer;

      // update current and opponent colors
      const temp = this.currentColor;
      this.currentColor = this.opponentColor;
      this.opponentColor = temp;

      // indicate the successful move
      return true;
    }

    // if the piece can't move to the destination, indicate failed move
    return false;
  }
}

export { Controller };
