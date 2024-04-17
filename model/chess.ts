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
        console.log(
          `%c${this.whitePlayer.name} won the game!`,
          "color: green; font-weight: bold"
        );
        break;
      case State.BLACK_WON:
        console.log(
          `${this.blackPlayer.name} won the game!`,
          "color: green; font-weight: bold"
        );
        break;
      case State.STALEMATE:
        console.log(`%cIt's a draw!`, "color: yellow; font-weight: bold");
        break;
      default:
        console.log("Game's not over yet!");
    }
  }

  move(player: Player, start: Position, end: Position): boolean {
    const moveSuccessful = this.controller.move(player, start, end);
    if (moveSuccessful) {
      this.moves.push(new Move(start, end));
    }
    return moveSuccessful;
  }

  play() {
    // display the board
    this.show();

    // print game result if the game ended
    if (this.state !== State.IN_PROGRESS) {
      this.printResult();
      return;
    }

    // display check if exists
    if (this.controller.check) {
      console.log("%cCheck!!!", "color: red; font-weight: bold");
    }

    // input player's move
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
