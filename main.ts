import { Chess, Player } from "./model/index.ts";

// Create players
const abdur = new Player("Abdur");
const kavya = new Player("Kavya");

// Create chess game
const chess = new Chess(abdur, kavya);

// chess.play();

chess.replay([
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
]);
