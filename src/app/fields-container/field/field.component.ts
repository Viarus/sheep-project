import { Component, Input, OnInit } from '@angular/core';
import { Field } from '../../core/models/field/field-model';
import { RowStorageService } from '../../core/storages/row-storage.service';
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
export class FieldComponent implements OnInit {
  @Input() fieldName: string = '';
  public arrayOfTheBiggerAmountOfSheep: AbstractSheep[] = [];

  private field!: Field;

  private sheepFactorySubscription: Subscription = new Subscription();
  private rowMatingSubscription: Subscription = new Subscription();

  constructor(private rowStorage: RowStorageService, private sheepFactory: SheepFactoryService, private rowMatingService: RowMatingService, private fieldStorage: FieldStorageService) {
  }

  ngOnInit(): void {
    this.field = this.fieldStorage.getFieldByName(this.fieldName);
    this.arrayOfTheBiggerAmountOfSheep = this.field.getArrayOfTheBiggerAmountOfSheep();
    this.sheepFactorySubscription = this.sheepFactory.getNewSheepEventSubject().subscribe((rowIndex) => {
      this.field = this.fieldStorage.getFieldByName(this.fieldName);
      this.arrayOfTheBiggerAmountOfSheep = this.field.getArrayOfTheBiggerAmountOfSheep();
    });
    this.rowMatingSubscription = this.rowMatingService.getOnRowDataChangeEventSubject().subscribe((rowIndex) => {
      this.field = this.fieldStorage.getFieldByName(this.fieldName);
      this.arrayOfTheBiggerAmountOfSheep = this.field.getArrayOfTheBiggerAmountOfSheep();
    });
  }
}
