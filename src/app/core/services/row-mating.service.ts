import { Injectable } from '@angular/core';
import { SheepFactoryService } from './sheep-factory.service';
import { PublicConstantsService } from '../constants/public-constants.service';
import { RowOfSheep } from '../models/row-of-sheep/row-of-sheep-model';
import { Subject } from 'rxjs';
import { AbstractSheep } from '../models/sheep/abstract-sheep-model';

@Injectable({
  providedIn: 'root'
})
export class RowMatingService {

  private readonly TIME_OF_MATING = 5000;
  private readonly TIME_OF_BREAK_BETWEEN_MATING = 8000;

  private onRowDataChangeEventSubject: Subject<number> = new Subject<number>();

  constructor(private sheepFactory: SheepFactoryService,
              private publicConstants: PublicConstantsService) {
  }

  public isPossibleToMate(row: RowOfSheep): boolean {
    if (row.getFemaleSheep() && row.getMaleSheep()) {
      if (!(this.isAnySheepBranded(row.getFemaleSheep()!, row.getMaleSheep()!) ||
        row.getDidMatingProcessOccurRecently() ||
        row.getIsMatingNow())) {
        return true;
      }
    }
    return false;
  }

  public startMatingProcessIfPossible(row: RowOfSheep): void {
    if (this.isPossibleToMate(row)) {
      row.setIsMatingNow(true);
      this.onRowDataChangeEventSubject.next(row.getRowIndex());
      new Promise(res => setTimeout(res, this.TIME_OF_MATING)).then(() => {
        row.setIsMatingNow(false);
        this.makeDidMatingOccurTemporarilyTrue(row);

        if (this.wasMatingSuccessful(row)) {
          this.sheepFactory.createAndAssignSheep(
            this.publicConstants.LAMB_NEW_BORN_DEFAULT_NAME,
            this.sheepFactory.gender_lamb,
            row.getFemaleSheep()!.getFieldTheSheepIsAssignedTo(),
            false)
        }
      })
    }
  }

  public brandSheep(sheep: AbstractSheep): void {
    sheep.setIsBranded(true);
    sheep.getFieldTheSheepIsAssignedTo().getRows()[sheep.getRowIndexTheSheepIsAssignedTo()!].setIsMatingNow(false);
    this.onRowDataChangeEventSubject.next(sheep.getRowIndexTheSheepIsAssignedTo()!);
  }

  public getOnRowDataChangeEventSubject(): Subject<number> {
    return this.onRowDataChangeEventSubject;
  }

  private wasMatingSuccessful(row: RowOfSheep): boolean {
    if (this.isAnySheepBranded(row.getFemaleSheep()!, row.getMaleSheep()!)) {
      return false;
    }
    return Math.random() >= 0.5;
  }

  private makeDidMatingOccurTemporarilyTrue(row: RowOfSheep): void {
    row.setDidMatingProcessOccurRecently(true);
    this.onRowDataChangeEventSubject.next(row.getRowIndex());
    new Promise(res => setTimeout(res, this.TIME_OF_BREAK_BETWEEN_MATING)).then(() => {
      row.setDidMatingProcessOccurRecently(false);
      this.onRowDataChangeEventSubject.next(row.getRowIndex());
    })
  }

  private isAnySheepBranded(...sheep: AbstractSheep[]): boolean {
    let result = false;
    for (let i = 0; i < sheep.length; i++) {
      if (sheep[i].isBranded()) {
        result = true;
        break;
      }
    }
    return result;
  }
}
