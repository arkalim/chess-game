import { Chess, Player } from "./model";

// Create players
const abdur = new Player("Abdur");
const kavya = new Player("Kavya");

// Create chess game
const chess = new Chess(abdur, kavya);

// checkmate
chess.replay([
  "e2-e4",
  "a7-a6",
  "g1-f3",
  "a6-a5",
  "f3-g5",
  "a5-a4",
  "d1-h5",
  "a4-a3",
]);

// check
// chess.replay(
//   [
//     "e2-e4",
//     "a7-a6",
//     "d1-h5",
//     "a6-a5"
//   ]
// )

// check
// chess.replay(
//   [
//     "e2-e4",
//     "f7-f6"
//   ]
// )

// king-king
// chess.replay(
//   [
//     "e2-e4",
//     "f7-f5",
//     "e4-f5",
//     "e8-f7",
//     "e1-e2",
//     "f7-f6",
//     "e2-e3",
//     "f6-f5"
//   ]
// )
