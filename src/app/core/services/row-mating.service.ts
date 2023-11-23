import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { SheepFactoryService } from './sheep-factory.service';
import { PublicConstantsService } from '../constants/public-constants.service';
import { RowOfSheep } from '../models/row-of-sheep/row-of-sheep-model';
import { delay, Subject, takeUntil, tap } from 'rxjs';
import { AbstractSheep } from '../models/sheep/abstract-sheep-model';

@Injectable({
  providedIn: 'root'
})
export class RowMatingService implements OnDestroy {
  private readonly TIME_OF_MATING = 5000;
  private readonly TIME_OF_BREAK_BETWEEN_MATING = 8000;

  private matingStarted$: Subject<RowOfSheep> = new Subject();
  private matingStopped$: Subject<RowOfSheep> = new Subject();
  private destroyed$: Subject<void> = new Subject();

  constructor(private sheepFactory: SheepFactoryService,
              private publicConstants: PublicConstantsService) {
    this.matingStarted$.pipe(takeUntil(this.destroyed$), delay(this.TIME_OF_MATING), tap(row => {
      row.setIsMatingNow(false);
      row.setDidMatingProcessOccurRecently(true);
      this.matingStopped$.next(row);

      if (this.wasMatingSuccessful(row)) {
        this.sheepFactory.createAndAssignSheep(
          this.publicConstants.LAMB_NEW_BORN_DEFAULT_NAME,
          this.sheepFactory.gender_lamb,
          row.femaleSheep!.getFieldTheSheepIsAssignedTo(),
          false)
      }
    })).subscribe();

    this.matingStopped$.pipe(takeUntil(this.destroyed$), delay(this.TIME_OF_BREAK_BETWEEN_MATING), tap(row => {
      row.setDidMatingProcessOccurRecently(false);
      this.startMatingProcessIfPossible(row);
    })).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  startMatingProcessIfPossible(row: RowOfSheep): void {
    if (this.isPossibleToMate(row)) {
      row.setIsMatingNow(true);
      this.matingStarted$.next(row);
    }
  }

  brandSheep(sheep: AbstractSheep): void {
    sheep.setIsBranded(true);
    sheep.getFieldTheSheepIsAssignedTo().getRows()[sheep.getRowIndexTheSheepIsAssignedTo()!].setIsMatingNow(false);
  }

  private wasMatingSuccessful(row: RowOfSheep): boolean {
    if (this.isAnySheepBranded(row.femaleSheep!, row.maleSheep!)) {
      return false;
    }
    return Math.random() >= 0.5;
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
      !row.isMatingNow;
  }
}
