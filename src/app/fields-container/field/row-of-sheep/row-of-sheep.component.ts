import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FieldStorageService } from '../../../core/storages/field-storage.service';
import { SheepFactoryService } from '../../../core/services/sheep-factory.service';
import { Subscription } from 'rxjs';
import { RowOfSheep } from '../../../core/models/row-of-sheep/row-of-sheep-model';
import { RowMatingService } from '../../../core/services/row-mating.service';
import { MaleSheep } from '../../../core/models/sheep/male-sheep-model';
import { FemaleSheep } from '../../../core/models/sheep/female-sheep-model';

@Component({
  selector: 'app-row-of-sheep',
  templateUrl: './row-of-sheep.component.html',
  styleUrls: ['./row-of-sheep.component.css']
})
export class RowOfSheepComponent implements OnInit, OnDestroy {
  @Input() row!: RowOfSheep;

  public femaleSheep: FemaleSheep | undefined;
  public maleSheep: MaleSheep | undefined;
  public isMatingNow = false;

  private readonly VISIBILITY_VISIBLE = 'visible';
  private readonly VISIBILITY_HIDDEN = 'hidden';

  private sheepFactorySubscription: Subscription = new Subscription();
  private matingServiceSubscription: Subscription = new Subscription();

  constructor(private fieldStorage: FieldStorageService, private sheepFactory: SheepFactoryService, private matingService: RowMatingService) {
  }

  ngOnInit(): void {
    this.refreshData();
    this.sheepFactorySubscription = this.sheepFactory.getNewSheepEventSubject().subscribe(() => {
      this.refreshData();
      this.matingService.startMatingProcessIfPossible(this.row);
    });
    this.matingServiceSubscription = this.matingService.getOnRowDataChangeEventSubject().subscribe(() => {
      this.refreshData();
      this.matingService.startMatingProcessIfPossible(this.row);
    });
  }

  ngOnDestroy(): void {
    this.sheepFactorySubscription.unsubscribe();
    this.matingServiceSubscription.unsubscribe();
  }

  public onFemaleSheepClick(): void {
    if (!!this.femaleSheep) {
      this.matingService.brandSheep(this.femaleSheep);
    }
  }

  public onMaleSheepClick(): void {
    if (!!this.maleSheep) {
      this.matingService.brandSheep(this.maleSheep);
    }
  }

  public getVisibilityForFemaleSheep(): string {
    return !!this.femaleSheep ? this.VISIBILITY_VISIBLE : this.VISIBILITY_HIDDEN;
  }

  public getVisibilityForMaleSheep(): string {
    return !!this.maleSheep ? this.VISIBILITY_VISIBLE : this.VISIBILITY_HIDDEN;
  }

  public getVisibilityForHeartIcon(): string {
    return this.isMatingNow ? this.VISIBILITY_VISIBLE : this.VISIBILITY_HIDDEN;
  }

  public showMaleSheepAsBranded(): boolean {
    if (!!this.maleSheep) {
      return this.maleSheep.isBranded();
    }
    return false;
  }

  public showFemaleSheepAsBranded(): boolean {
    if (!!this.femaleSheep) {
      return this.femaleSheep.isBranded();
    }
    return false;
  }

  private refreshData(): void {
    this.isMatingNow = this.row.isMatingNow();
    this.femaleSheep = this.row.femaleSheep;
    this.maleSheep = this.row.maleSheep;
  }
}
