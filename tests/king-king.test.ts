import { assertEquals } from "jsr:@std/assert";
import { Chess, Player, State } from "../model/index.ts";

Deno.test("king-king", () => {
  // Create players
  const a = new Player("A");
  const b = new Player("B");

  // Create chess game
  const chess = new Chess(a, b);

  // checkmate
  chess.replay(
    [
      "e2-e4",
      "f7-f5",
      "e4-f5",
      "e8-f7",
      "e1-e2",
      "f7-f6",
      "e2-e3",
      "f6-f5",
      "e3-e4", // invalid move
    ],
    false
  );

  assertEquals(chess.state, State.IN_PROGRESS);
  assertEquals(chess.controller.currentPlayer, chess.whitePlayer);
  assertEquals(chess.moves.length, 8);
});
