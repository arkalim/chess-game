import { assertEquals } from "jsr:@std/assert";
import { Chess, Player, State } from "../model/index.ts";

Deno.test("checkmate", () => {
  // Create players
  const a = new Player("A");
  const b = new Player("B");

  // Create chess game
  const chess = new Chess(a, b);

  // checkmate
  chess.replay(
    [
      "e2-e4",
      "a7-a6",
      "g1-f3",
      "a6-a5",
      "f3-g5",
      "a5-a4",
      "d1-h5",
      "a4-a3",
      "h5-f7",
    ],
    false
  );

  assertEquals(chess.state, State.WHITE_WON);
});
