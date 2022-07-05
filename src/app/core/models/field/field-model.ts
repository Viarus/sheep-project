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

  public assignSheepToRow(sheep: AbstractSheep, numberOfRowsBeforeNewSheepAdded: number): number | null {
    if (sheep instanceof MaleSheep) {
      // If we have just one sheep now (including the new one, so the only one) then we can assign it to row number 0.
      const indexOfNewRow: number = this.getMaleSheep().length - 1;
      if (numberOfRowsBeforeNewSheepAdded > indexOfNewRow) {
        this.rows[indexOfNewRow].setMaleSheep(sheep);
      } else {
        this.rows.push(new RowOfSheep(this.fieldName, indexOfNewRow, undefined, sheep))
      }
      sheep.setRowIndexTheSheepIsAssignedTo(indexOfNewRow);
      return indexOfNewRow;
    }
    if (sheep instanceof FemaleSheep) {
      const indexOfNewRow: number = this.getFemaleSheep().length - 1;
      if (numberOfRowsBeforeNewSheepAdded > indexOfNewRow) {
        this.rows[indexOfNewRow].setFemaleSheep(sheep);
      } else {
        this.rows.push(new RowOfSheep(this.fieldName, indexOfNewRow, sheep, undefined))
      }
      sheep.setRowIndexTheSheepIsAssignedTo(indexOfNewRow);
      return indexOfNewRow;
    }
    return null;
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

  public getRandomUnbrandedSheep(): AbstractSheep | null {
    const allUnbrandedSheep = this.getAllUnbrandedSheep();
    if (allUnbrandedSheep.length > 0) {
      return this.getAllUnbrandedSheep()[Math.floor(Math.random() * this.getAllUnbrandedSheep().length)];
    }
    return null;
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
    return this.sheepInside.filter((sheep) => {
      return !sheep.isBranded();
    })
  }
}
