import { AbstractSheep } from '../sheep/abstract-sheep-model';
import { MaleSheep } from '../sheep/male-sheep-model';
import { FemaleSheep } from '../sheep/female-sheep-model';
import { LambSheep } from '../sheep/lamb-sheep-model';
import { RowOfSheep } from '../row-of-sheep/row-of-sheep-model';

export class Field {
  private rows: RowOfSheep[] = []

  private readonly fieldName: string;
  private sheepInside: AbstractSheep[] = [];
  private maleSheepInside: MaleSheep[] = [];
  private femaleSheepInside: FemaleSheep[] = [];
  private lambSheepInside: LambSheep[] = [];

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  public addSheep(sheep: AbstractSheep): void {
    this.sheepInside.push(sheep);

    // Indexing sheep too, because we are going to query them often.
    if (sheep instanceof MaleSheep) {
      this.maleSheepInside.push(sheep);
    }
    if (sheep instanceof FemaleSheep) {
      this.femaleSheepInside.push(sheep);
    }
    if (sheep instanceof LambSheep) {
      this.lambSheepInside.push(sheep);
    }
  }

  public assignSheepToRow(sheep: AbstractSheep, numberOfRowsBeforeNewSheepAdded: number): number {
    if (sheep instanceof MaleSheep) {
      const indexOfNewRow: number = this.getMaleSheep().length;
      if (numberOfRowsBeforeNewSheepAdded >= this.getMaleSheep().length) {
        this.rows[this.getMaleSheep().length - 1].setMaleSheep(sheep);
      } else {
        this.rows.push(new RowOfSheep(this.fieldName, indexOfNewRow, undefined, sheep))
      }
      return indexOfNewRow;
    }
    if (sheep instanceof FemaleSheep) {
      const indexOfNewRow: number = this.getFemaleSheep().length;
      if (numberOfRowsBeforeNewSheepAdded >= this.getFemaleSheep().length) {
        this.rows[this.getFemaleSheep().length - 1].setFemaleSheep(sheep);
      } else {
        this.rows.push(new RowOfSheep(this.fieldName, indexOfNewRow, sheep, undefined))
      }
      return indexOfNewRow;
    }
    throw new Error('Cannot assign this gender of sheep.');
  }

  public getArrayOfTheBiggerAmountOfSheep(): AbstractSheep[] {
    return this.getFemaleSheep().length > this.getMaleSheep().length ? this.getFemaleSheep() : this.getMaleSheep();
  }

  public getNumberOfRows(): number {
    return this.getArrayOfTheBiggerAmountOfSheep().length;
  }

  public getFieldName(): string {
    return this.fieldName;
  }

  public getRows(): RowOfSheep[] {
    return this.rows;
  }

  public getAllSheep(): AbstractSheep[] {
    return this.sheepInside;
  }

  public getMaleSheep(): MaleSheep[] {
    return this.maleSheepInside;
  }

  public getFemaleSheep(): FemaleSheep[] {
    return this.femaleSheepInside;
  }

  public getLambSheep(): LambSheep[] {
    return this.lambSheepInside;
  }

  public getMaleSheepByIndex(index: number): MaleSheep | null {
    if (index > this.maleSheepInside.length - 1) {
      return null;
    }
    return this.maleSheepInside[index];
  }

  public getFemaleSheepByIndex(index: number): FemaleSheep | null {
    if (index > this.femaleSheepInside.length - 1) {
      return null;
    }
    return this.femaleSheepInside[index];
  }

  public getLambSheepByIndex(index: number): LambSheep | null {
    if (index > this.lambSheepInside.length - 1) {
      return null;
    }
    return this.lambSheepInside[index];
  }

  public getRandomUnbrandedSheep(): AbstractSheep {
    return this.getAllUnbrandedSheep()[Math.floor(Math.random() * this.getAllUnbrandedSheep().length)];
  }

  public removeOneLamb(): void {
    this.getLambSheep().pop();

    let indexToDelete = -1;
    this.getAllSheep().forEach((sheep, index) => {
      if (sheep instanceof LambSheep) {
        indexToDelete = index;
      }
    });

    if (indexToDelete >= 0) {
      this.getAllSheep().splice(indexToDelete, 1);
    } else {
      throw new Error('Lamb has escaped from growing up, I guess it will be happy forever...');
    }
  }

  private getAllUnbrandedSheep(): AbstractSheep[] {
    const unbrandedSheepArray: AbstractSheep[] = [];
    this.sheepInside.forEach((sheep) => {
      if (!sheep.isBranded()) {
        unbrandedSheepArray.push(sheep);
      }
    })
    return unbrandedSheepArray;
  }
}
