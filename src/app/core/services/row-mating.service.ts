import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { SheepFactoryService } from './sheep-factory.service';
import { PublicConstantsService } from '../constants/public-constants.service';
import { RowOfSheep } from '../models/row-of-sheep/row-of-sheep-model';
import { delay, Subject, takeUntil, tap } from 'rxjs';
import { AbstractSheep } from '../models/sheep/abstract-sheep-model';

@Injectable({
  providedIn: 'root'
})
export class RowMatingService implements OnDestroy{
  private readonly TIME_OF_MATING = 5000;
  private readonly TIME_OF_BREAK_BETWEEN_MATING = 8000;

  private onRowDataChangeEvent$: Subject<number> = new Subject<number>();
  private matingStarted$: Subject<RowOfSheep> = new Subject();
  private destroyed$: Subject<void> = new Subject();

  constructor(private sheepFactory: SheepFactoryService,
              private publicConstants: PublicConstantsService) {
    this.matingStarted$.pipe(takeUntil(this.destroyed$), delay(this.TIME_OF_MATING), tap(row => {
      row.setIsMatingNow(false);
      this.makeDidMatingOccurTemporarilyTrue(row);

      if (this.wasMatingSuccessful(row)) {
        this.sheepFactory.createAndAssignSheep(
          this.publicConstants.LAMB_NEW_BORN_DEFAULT_NAME,
          this.sheepFactory.gender_lamb,
          row.femaleSheep!.getFieldTheSheepIsAssignedTo(),
          false)
      }
    })).subscribe()
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  public startMatingProcessIfPossible(row: RowOfSheep): void {
    if (this.isPossibleToMate(row)) {
      row.setIsMatingNow(true);
      this.onRowDataChangeEvent$.next(row.getRowIndex());
      console.log('started?')
      this.matingStarted$.next(row);
    }
  }

  public brandSheep(sheep: AbstractSheep): void {
    sheep.setIsBranded(true);
    sheep.getFieldTheSheepIsAssignedTo().getRows()[sheep.getRowIndexTheSheepIsAssignedTo()!].setIsMatingNow(false);
    this.onRowDataChangeEvent$.next(sheep.getRowIndexTheSheepIsAssignedTo()!);
  }

  public getOnRowDataChangeEventSubject(): Subject<number> {
    return this.onRowDataChangeEvent$;
  }

  private wasMatingSuccessful(row: RowOfSheep): boolean {
    if (this.isAnySheepBranded(row.femaleSheep!, row.maleSheep!)) {
      return false;
    }
    return Math.random() >= 0.5;
  }

  private makeDidMatingOccurTemporarilyTrue(row: RowOfSheep): void {
    row.setDidMatingProcessOccurRecently(true);
    this.onRowDataChangeEvent$.next(row.getRowIndex());
    new Promise(res => setTimeout(res, this.TIME_OF_BREAK_BETWEEN_MATING)).then(() => {
      row.setDidMatingProcessOccurRecently(false);
      this.onRowDataChangeEvent$.next(row.getRowIndex());
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

  private isPossibleToMate(row: RowOfSheep): boolean {
    const femaleSheep = row.femaleSheep;
    const maleSheep = row.maleSheep;
    if (!femaleSheep || !maleSheep) {
      return false;
    }

    return !this.isAnySheepBranded(femaleSheep, maleSheep) &&
      !row.didMatingProcessOccurRecently() &&
      !row.isMatingNow();
  }
}
