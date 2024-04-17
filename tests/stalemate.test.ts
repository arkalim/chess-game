import { assertEquals } from "jsr:@std/assert";
import { Chess, Player, State } from "../model/index.ts";

Deno.test("stalemate", () => {
  // Create players
  const a = new Player("A");
  const b = new Player("B");

  // Create chess game
  const chess = new Chess(a, b);

  // checkmate
  chess.replay(
    [
      "e2-e3", // White Pawn moves from e2 to e3
      "a7-a5", // Black Pawn moves from a7 to a5
      "d1-h5", // White Queen moves from d1 to h5
      "a8-a6", // Black Rook moves from a8 to a6
      "h5-a5", // White Queen captures the Black Pawn on a5
      "h7-h5", // Black Pawn moves from h7 to h5
      "h2-h4", // White Pawn moves from h2 to h4
      "a6-h6", // Black Rook moves from a6 to h6
      "a5-c7", // White Queen moves to c7
      "f7-f6", // Black Pawn moves from f7 to f6
      "c7-d7", // White Queen moves to d7
      "e8-f7", // Black King moves from e8 to f7
      "d7-b7", // White Queen moves to b7
      "d8-d3", // Black Queen moves from d8 to d3
      "b7-b8", // White Queen moves to b8
      "d3-h7", // Black Queen moves to h7
      "b8-c8", // White Queen moves to c8
      "f7-g6", // Black King moves to g6
      "c8-e6", // White Queen moves to e6, resulting in stalemate
    ],
    false
  );

  assertEquals(chess.state, State.STALEMATE);
});
