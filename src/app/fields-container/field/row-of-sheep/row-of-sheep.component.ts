import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SheepFactoryService } from '../../../core/services/sheep-factory.service';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { RowOfSheep } from '../../../core/models/row-of-sheep-model';
import { RowMatingService } from '../../../core/services/row-mating.service';

@Component({
  selector: 'app-row-of-sheep',
  templateUrl: './row-of-sheep.component.html',
  styleUrls: ['./row-of-sheep.component.css']
})
export class RowOfSheepComponent implements OnInit, OnDestroy {
  @Input({required: true}) row!: RowOfSheep;

  private readonly VISIBILITY_VISIBLE = 'visible';
  private readonly VISIBILITY_HIDDEN = 'hidden';

  private destroy$: Subject<void> = new Subject();

  constructor(private sheepFactory: SheepFactoryService, private matingService: RowMatingService) {
  }

  ngOnInit(): void {
    this.sheepFactory.getNewSheepEventSubject().pipe(
      takeUntil(this.destroy$),
      tap(() => this.matingService.startMatingProcessIfPossible(this.row))).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onFemaleSheepClick(): void {
    if (this.row.femaleSheep) {
      this.matingService.brandSheep(this.row.femaleSheep);
    }
  }

  onMaleSheepClick(): void {
    if (this.row.maleSheep) {
      this.matingService.brandSheep(this.row.maleSheep);
    }
  }

  get visibilityForFemaleSheep(): string {
    return !!this.row.femaleSheep ? this.VISIBILITY_VISIBLE : this.VISIBILITY_HIDDEN;
  }

  get visibilityForMaleSheep(): string {
    return !!this.row.maleSheep ? this.VISIBILITY_VISIBLE : this.VISIBILITY_HIDDEN;
  }

  get visibilityForHeartIcon(): string {
    return this.row.isMatingNow ? this.VISIBILITY_VISIBLE : this.VISIBILITY_HIDDEN;
  }

  get isMaleBranded(): boolean {
    if (!!this.row.maleSheep) {
      return this.row.maleSheep.isBranded();
    }
    return false;
  }

  get isFemaleBranded(): boolean {
    if (!!this.row.femaleSheep) {
      return this.row.femaleSheep.isBranded();
    }
    return false;
  }
}
