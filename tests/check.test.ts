import { assertEquals } from "jsr:@std/assert";
import { Chess, Player, State } from "../model/index.ts";

Deno.test("check", () => {
  // Create players
  const a = new Player("A");
  const b = new Player("B");

  // Create chess game
  const chess = new Chess(a, b);

  // check
  chess.replay(["e2-e4", "a7-a6", "d1-h5", "a6-a5", "h5-f7"], false);

  assertEquals(chess.controller.check, true);
  assertEquals(chess.state, State.IN_PROGRESS);
});
