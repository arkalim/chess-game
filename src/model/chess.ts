import { Board } from "./board";
import { Move } from "./move";
import { Position } from "./position";
import { State } from "./state";
import { Player } from "./player";
import { Controller } from "./controller";

import * as readline from "readline";

class Chess {
  board: Board;
  state: State;
  moves: Move[] = [];

  whitePlayer: Player;
  blackPlayer: Player;

  controller: Controller;

  readline = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

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
    this.readline.question(
      `${this.controller.currentPlayer.name}'s move: `,
      (move) => {
        try {
          const [start, end] = move.split("-");
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
    );
  }

  replay(moves: string[]) {
    for (const move of moves) {
      const [start, end] = move.split("-");
      this.move(
        this.controller.currentPlayer,
        new Position(start),
        new Position(end)
      );
    }

    this.play();
  }
}

export { Chess };
