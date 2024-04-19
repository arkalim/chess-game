import { Chess, Player } from "./model/index.ts";

// Create players
const abdur = new Player("Abdur");
const kavya = new Player("Kavya");

// Create chess game
const chess = new Chess(abdur, kavya);

chess.play();
