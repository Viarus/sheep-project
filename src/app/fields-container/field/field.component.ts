import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Field } from '../../core/models/field/field-model';
import { AbstractSheep } from '../../core/models/sheep/abstract-sheep-model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class FieldComponent implements OnInit {

  @Input() field!: Field;

  constructor() {
  }

  ngOnInit(): void {
  }

  public getArrayOfTheBiggerAmountOfSheep(): AbstractSheep[] {
    return this.field.getFemaleSheep() > this.field.getMaleSheep() ? this.field.getFemaleSheep() : this.field.getMaleSheep();
  }
}
