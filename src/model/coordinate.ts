export type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export const Ranks: Rank[] = [1, 2, 3, 4, 5, 6, 7, 8];
export const Files: File[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const H_CHAR_CODE = 73;

export class Coordinate {
  public file: File;
  public rank: Rank;

  constructor(file: File, rank: Rank) {
    this.file = file;
    this.rank = rank;
  }

  flipRank(): Coordinate {
    const newRank: Rank = (8 - this.rank + 1) as Rank;

    return new Coordinate(this.file, newRank);
  }

  flipFile(): Coordinate {
    const code = (H_CHAR_CODE - this.file.charCodeAt(0) + 1);
    const file: File = String.fromCharCode(code) as File;

    return new Coordinate(file, this.rank);
  }
}
