import { assertEquals } from "jsr:@std/assert";
import { Chess, Player, State } from "../model/index.ts";

Deno.test("pawn-promotion", () => {
  // Create players
  const a = new Player("A");
  const b = new Player("B");

  // Create chess game
  const chess = new Chess(a, b);

  // checkmate
  chess.replay(
    [
      "a2-a4",
      "b7-b5",
      "a4-b5",
      "a7-a6",
      "a1-a6",
      "a8-a6",
      "b5-a6",
      "c7-c6",
      "a6-a7",
      "c6-c5",
      "a7-a8", // promotion to a queen
    ],
    false
  );

  assertEquals(chess.board.getTile(7, 0)?.isEmpty(), false);
  assertEquals(chess.board.getTile(7, 0)?.piece?.getShorthand(), "Q_W");
  assertEquals(chess.state, State.IN_PROGRESS);
});
