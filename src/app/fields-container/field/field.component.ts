import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Field } from '../../core/models/field/field-model';
import { SheepFactoryService } from '../../core/services/sheep-factory.service';
import { Subscription } from 'rxjs';
import { FieldStorageService } from '../../core/storages/field-storage.service';
import { AbstractSheep } from '../../core/models/sheep/abstract-sheep-model';
import { RowMatingService } from '../../core/services/row-mating.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit, OnDestroy {
  @Input() fieldName: string = '';

  public arrayOfTheBiggerAmountOfSheep: AbstractSheep[] = [];
  public field!: Field;

  private sheepFactorySubscription: Subscription = new Subscription();
  private rowMatingSubscription: Subscription = new Subscription();

  constructor(private sheepFactory: SheepFactoryService,
              private rowMatingService: RowMatingService,
              private fieldStorage: FieldStorageService) {
  }

  ngOnInit(): void {
    this.field = this.fieldStorage.getFieldByName(this.fieldName);
    this.arrayOfTheBiggerAmountOfSheep = this.field.getArrayOfTheBiggerAmountOfSheep();

    this.sheepFactorySubscription = this.sheepFactory.getNewSheepEventSubject().subscribe(() => {
      this.field = this.fieldStorage.getFieldByName(this.fieldName);
      this.arrayOfTheBiggerAmountOfSheep = this.field.getArrayOfTheBiggerAmountOfSheep();
    });

    this.rowMatingSubscription = this.rowMatingService.getOnRowDataChangeEventSubject().subscribe(() => {
      this.field = this.fieldStorage.getFieldByName(this.fieldName);
      this.arrayOfTheBiggerAmountOfSheep = this.field.getArrayOfTheBiggerAmountOfSheep();
    });
  }

  ngOnDestroy(): void {
    this.rowMatingSubscription.unsubscribe();
    this.sheepFactorySubscription.unsubscribe();
  }
}
