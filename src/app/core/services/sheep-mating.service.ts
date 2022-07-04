import { Injectable } from '@angular/core';
import { FemaleSheep } from '../models/sheep/female-sheep-model';
import { MaleSheep } from '../models/sheep/male-sheep-model';
import { Subject } from 'rxjs';
import { SheepFactoryService } from './sheep-factory.service';
import { PublicConstantsService } from '../constants/public-constants.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SheepMatingService {

  constructor(private sheepFactory: SheepFactoryService, private publicConstants: PublicConstantsService, private errorHandler: ErrorHandlerService, private toastrService: ToastrService) {
  }

  private matingStateChangeSubject: Subject<number> = new Subject<number>();

  private static wasMatingSuccessful(femaleSheep: FemaleSheep, maleSheep: MaleSheep): boolean {
    if (femaleSheep.isBranded() || maleSheep.isBranded()) {
      return false;
    }
    return Math.random() >= 0.5;
  }

  public startMatingProcess(femaleSheep: FemaleSheep, maleSheep: MaleSheep): void {
    if (femaleSheep.wasMatingInLast8seconds() || !femaleSheep.isAbleToMate() || femaleSheep.isMatingRightNow()) {
      return;
    }
    femaleSheep.setIsMatingRightNow(true);
    new Promise(res => setTimeout(res, 5000)).then(() => {
        femaleSheep.setWasMatingInLast8seconds(true);
        femaleSheep.setIsMatingRightNow(false);
        try {
          if (SheepMatingService.wasMatingSuccessful(femaleSheep, maleSheep)) {
            this.sheepFactory.createAndAssignSheep(
              this.publicConstants.LAMB_NEW_BORN_DEFAULT_NAME,
              this.sheepFactory.gender_lamb,
              femaleSheep.getFieldTheSheepIsAssignedTo(),
              false)
          }
        } catch (e) {
          this.errorHandler.handleError(e);
          return;
        }
        this.matingStateChangeSubject.next(0);
        new Promise(res => setTimeout(res, 8000)).then(() => {
          femaleSheep.setWasMatingInLast8seconds(false);
          this.matingStateChangeSubject.next(0);
        }).catch((error) => {
          this.toastrService.error('Something weird happen in mating service. Message: ' + error.message);
        });
      }
    ).catch((error) => {
      this.toastrService.error('Something weird happen in mating service. Message: ' + error.message);
    });
  }

  public getMatingStateChangeSubject(): Subject<number> {
    return this.matingStateChangeSubject;
  }
}
