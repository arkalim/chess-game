import { Board } from "./board.ts";
import { Move } from "./move.ts";
import { Position } from "./position.ts";
import { State } from "./state.ts";
import { Player } from "./player.ts";
import { Controller } from "./controller.ts";

class Chess {
  board: Board;
  state: State;
  moves: Move[] = [];

  whitePlayer: Player;
  blackPlayer: Player;

  controller: Controller;

  constructor(whitePlayer: Player, blackPlayer: Player) {
    this.state = State.IN_PROGRESS;
    this.whitePlayer = whitePlayer;
    this.blackPlayer = blackPlayer;

    this.board = new Board(this);
    this.controller = new Controller(this);
  }

  show() {
    this.board.display();
  }

  printResult() {
    switch (this.state) {
      case State.WHITE_WON:
        console.log(`${this.whitePlayer.name} won the game!`);
        break;
      case State.BLACK_WON:
        console.log(`${this.blackPlayer.name} won the game!`);
        break;
      case State.STALEMATE:
        console.log(`It's a draw!`);
        break;
      default:
        console.log("Game's not over yet!");
    }
  }

  move(player: Player, start: Position, end: Position) {
    if (this.controller.move(player, start, end)) {
      this.moves.push(new Move(start, end));
    }
  }

  play() {
    if (this.state !== State.IN_PROGRESS) {
      this.printResult();
      return;
    }
    this.show();
    const move = prompt(`${this.controller.currentPlayer.name}'s move: `);
    try {
      const [start, end] = move!.split("-");
      this.move(
        this.controller.currentPlayer,
        new Position(start),
        new Position(end)
      );
      this.play();
    } catch (error) {
      console.error(`Exception occurred: ${error}`);
      this.play();
    }
  }

  replay(moves: string[], play = true) {
    for (const move of moves) {
      const [start, end] = move.split("-");
      this.move(
        this.controller.currentPlayer,
        new Position(start),
        new Position(end)
      );
    }

    if (play) {
      this.play();
    }
  }
}

export { Chess };
