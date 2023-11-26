import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { SheepFactoryService } from './sheep-factory.service';
import { RowOfSheep } from '../models/row-of-sheep/row-of-sheep-model';
import { delay, Subject, takeUntil, tap } from 'rxjs';
import { AbstractSheep } from '../models/sheep/abstract-sheep-model';

@Injectable({
  providedIn: 'root'
})
export class RowMatingService implements OnDestroy {
  private readonly TIME_OF_MATING = 5000;
  private readonly TIME_BETWEEN_MATING_ATTEMPTS = 8000;
  private readonly lambDefaultName = 'Little Bob';

  private matingStarted$: Subject<RowOfSheep> = new Subject();
  private matingStopped$: Subject<RowOfSheep> = new Subject();
  private destroyed$: Subject<void> = new Subject();

  constructor(private sheepFactory: SheepFactoryService) {
    this.matingStarted$.pipe(takeUntil(this.destroyed$), delay(this.TIME_OF_MATING), tap(row => {
      row.setIsMatingNow(false);
      row.setDidMatingProcessOccurRecently(true);
      this.matingStopped$.next(row);
      if (this.wasMatingSuccessful(row)) {
        this.sheepFactory.createAndAssignSheep(
          this.lambDefaultName,
          this.sheepFactory.gender_lamb,
          row.femaleSheep!.getFieldTheSheepIsAssignedTo(),
          false)
      }
    })).subscribe();

    this.matingStopped$.pipe(takeUntil(this.destroyed$), delay(this.TIME_BETWEEN_MATING_ATTEMPTS), tap(row => {
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
    sheep.getFieldTheSheepIsAssignedTo().rows[sheep.getRowIndexTheSheepIsAssignedTo()!].setIsMatingNow(false);
  }

  private wasMatingSuccessful(row: RowOfSheep): boolean {
    const allSheep = row.allSheep;
    if (allSheep.length !==2 || this.isAnySheepBranded(allSheep)) {
      return false;
    }

    return Math.random() >= 0.5;
  }

  private isAnySheepBranded(sheep: AbstractSheep[]): boolean {
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
    const allSheep = row.allSheep;
    return allSheep.length === 2 && !this.isAnySheepBranded(allSheep) &&
      !row.didMatingProcessOccurRecently &&
      !row.isMatingNow;
  }
}
