import { Component, Input } from '@angular/core';
import { Field } from '../../core/models/field/field-model';
import { SheepFactoryService } from '../../core/services/sheep-factory.service';
import { RowMatingService } from '../../core/services/row-mating.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { PublicConstantsService } from '../../core/constants/public-constants.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent {
  @Input() field!: Field;

  constructor(private sheepFactory: SheepFactoryService,
              private rowMatingService: RowMatingService,
              private errorHandler: ErrorHandlerService,
              private publicConstants: PublicConstantsService) {
  }

  public onBrandRandom(): void {
    const randomSheep = this.field.getRandomUnbrandedSheep();
    if (!!randomSheep) {
      this.rowMatingService.brandSheep(randomSheep);
    } else {
      this.errorHandler.handleError(this.publicConstants.NO_MORE_SHEEP_TO_BRAND);
    }
  }
}
