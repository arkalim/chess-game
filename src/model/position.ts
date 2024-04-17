class Position {
  position: string
  row: number
  column: number

  constructor(position: string) {
    this.position = position
    const encodedPosition = this.encodePosition(position);
    if (encodedPosition !== undefined) {
      [this.row, this.column] = encodedPosition;
    } else {
      throw new Error(`Invalid position: ${position}`);
    }
  }

  encodePosition(position: string): [number, number] | undefined {
    const file = position[0].charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = parseInt(position[1]) - 1;

    // Check if the position is valid (within the chessboard)
    if (file >= 0 && file <= 7 && rank >= 0 && rank <= 7) {
      return [rank, file]; // Return [row, column]
    } else {
      return undefined; // Invalid position
    }
  }
}

export { Position }