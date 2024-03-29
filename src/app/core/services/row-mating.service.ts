import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { SheepFactoryService } from './sheep-factory.service';
import { RowOfSheep } from '../models/row-of-sheep-model';
import { delay, ReplaySubject, Subject, takeUntil, tap } from 'rxjs';
import { AbstractSheep } from '../models/sheep/abstract-sheep-model';
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class RowMatingService implements OnDestroy {
  private readonly TIME_OF_MATING = 5000;
  private readonly TIME_BETWEEN_MATING_ATTEMPTS = 8000;
  private readonly lambDefaultName = 'Little Bob';

  private matingStarted$: Subject<RowOfSheep> = new Subject();
  private matingStopped$: Subject<RowOfSheep> = new Subject();
  private destroyed$: ReplaySubject<void> = new ReplaySubject(1);

  constructor(private sheepFactory: SheepFactoryService, private errorHandler: ErrorHandlerService) {
    this.matingStarted$.pipe(takeUntil(this.destroyed$), delay(this.TIME_OF_MATING), tap(row => {
      row.setIsMatingNow(false);
      row.setDidMatingProcessOccurRecently(true);
      this.matingStopped$.next(row);
      if (this.wasMatingSuccessful(row)) {
        this.sheepFactory.createLamb(this.lambDefaultName, row.field);
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
    if (AbstractSheep.isLamb(sheep)) {
      this.errorHandler.handleError("You can't brand a lamb!");
      return;
    }

    sheep.brand();
    sheep.field.rows[sheep.rowIndex].setIsMatingNow(false);
  }

  private wasMatingSuccessful(row: RowOfSheep): boolean {
    const allSheep = row.allSheep;
    return (allSheep.length !== 2 || allSheep.some((sheep) => sheep.isBranded)) ? false : Math.random() >= 0.5;
  }

  private isPossibleToMate(row: RowOfSheep): boolean {
    const allSheep = row.allSheep;
    return allSheep.length === 2 && allSheep.every((sheep) => !sheep.isBranded) &&
      !row.didMatingProcessOccurRecently &&
      !row.isMatingNow;
  }
}
