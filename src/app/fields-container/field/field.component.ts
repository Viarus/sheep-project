import { Component, Input } from '@angular/core';
import { Field } from '../../core/models/field/field-model';
import { SheepFactoryService } from '../../core/services/sheep-factory.service';
import { RowMatingService } from '../../core/services/row-mating.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent {
  @Input() field!: Field;

  constructor(private sheepFactory: SheepFactoryService,
              private rowMatingService: RowMatingService) {
  }

  public onBrandRandom(): void {
    const randomSheep = this.field.getRandomUnbrandedSheep();
    if (!!randomSheep) {
      this.rowMatingService.brandSheep(randomSheep);
    }
  }
}
