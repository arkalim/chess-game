import { Chess, Player } from "./model/index.ts";

// Create players
const abdur = new Player("Abdur");
const kavya = new Player("Kavya");

// Create chess game
const chess = new Chess(abdur, kavya);

// chess.play();

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
