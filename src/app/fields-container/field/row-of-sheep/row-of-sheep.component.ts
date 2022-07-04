import { Component, Input, OnInit } from '@angular/core';
import { FieldStorageService } from '../../../core/storages/field-storage.service';
import { SheepFactoryService } from '../../../core/services/sheep-factory.service';
import { Subscription } from 'rxjs';
import { RowOfSheep } from '../../../core/models/row-of-sheep/row-of-sheep-model';
import { RowMatingService } from '../../../core/services/row-mating.service';

@Component({
  selector: 'app-row-of-sheep',
  templateUrl: './row-of-sheep.component.html',
  styleUrls: ['./row-of-sheep.component.css']
})
export class RowOfSheepComponent implements OnInit {
  @Input() rowIndex!: number;
  @Input() fieldName!: string;

  public femaleSheepName: string | undefined = '';
  public maleSheepName: string | undefined = '';
  public isMatingNow: boolean = false;

  private row: RowOfSheep = new RowOfSheep('none', 3, undefined, undefined);

  private sheepFactorySubscription: Subscription = new Subscription();
  private matingServiceSubscription: Subscription = new Subscription();

  constructor(private fieldStorage: FieldStorageService, private sheepFactory: SheepFactoryService, private matingService: RowMatingService) {

  }

  ngOnInit(): void {
    this.row = this.fieldStorage.getFieldByName(this.fieldName).getRows()[this.rowIndex];
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

  public getVisibilityForFemaleSheep(): string {
    return !!this.femaleSheepName ? 'visible' : 'hidden';
  }

  public getVisibilityForMaleSheep(): string {
    return !!this.maleSheepName ? 'visible' : 'hidden';
  }

  public getVisibilityForHeartIcon(): string {
    return this.isMatingNow ? 'visible' : 'hidden';
  }

  private refreshData(): void {
    const row = this.fieldStorage.getFieldByName(this.fieldName).getRows()[this.rowIndex];
    this.isMatingNow = row.getIsMatingNow();
    this.femaleSheepName = row.getFemaleSheep()?.getName();
    this.maleSheepName = row.getMaleSheep()?.getName();
  }
}
