import { Component, Input } from '@angular/core';
import { Field } from '../../core/models/field-model';
import { RowMatingService } from '../../core/services/row-mating.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent {
  @Input({required: true}) field!: Field;

  constructor(private rowMatingService: RowMatingService, private errorHandler: ErrorHandlerService) {
  }

  public onBrandRandom(): void {
    const randomSheep = this.field.getRandomUnbrandedSheep();
    if (randomSheep) {
      this.rowMatingService.brandSheep(randomSheep);
    } else {
      this.errorHandler.handleError('No more sheep to brand');
    }
  }
}
