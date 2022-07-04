import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FemaleSheep } from '../../../core/models/sheep/female-sheep-model';
import { MaleSheep } from '../../../core/models/sheep/male-sheep-model';
import { SheepBrandingService } from '../../../core/services/sheep-branding.service';
import { SheepFactoryService } from '../../../core/services/sheep-factory.service';
import { PublicConstantsService } from '../../../core/constants/public-constants.service';

@Component({
  selector: 'app-row-of-sheep',
  templateUrl: './row-of-sheep.component.html',
  styleUrls: ['./row-of-sheep.component.css']
})
export class RowOfSheepComponent implements OnInit, OnChanges {
  @Input() femaleSheep: FemaleSheep | null = null;
  @Input() maleSheep: MaleSheep | null = null;
  @Input() rowIndex!: number;
  private didMatingProcessOccurRecently = false;
  private isMatingNow = false;
  private readonly TIME_OF_MATING = 5000;
  private readonly TIME_OF_BREAK_BETWEEN_MATING = 8000;

  constructor(private sheepBrandingService: SheepBrandingService,
              private sheepFactory: SheepFactoryService,
              private publicConstants: PublicConstantsService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.isPossibleToMate()) {
      console.log("On Changes");
      // We know the sheep exist, because they need to in order to this.isPossibleToMate() be true.
      this.startMatingProcess(this.femaleSheep!, this.maleSheep!);
    }
  }

  public isPossibleToMate(): boolean {
    if (this.femaleSheep && this.maleSheep) {
      if (!(this.sheepBrandingService.isAnySheepBranded(this.femaleSheep, this.maleSheep) ||
        this.didMatingProcessOccurRecently ||
        this.isMatingNow)) {
        return true;
      }
    }
    return false;
  }

  public startMatingProcess(femaleSheep: FemaleSheep, maleSheep: MaleSheep): void {
    if (this.isPossibleToMate()) {
      this.isMatingNow = true;

      new Promise(res => setTimeout(res, this.TIME_OF_MATING)).then(() => {
        this.isMatingNow = false;
        this.didMatingProcessOccurRecently = true;
        this.makeDidMatingOccurTemporarilyTrue();

        if (this.wasMatingSuccessful(femaleSheep, maleSheep)) {
          this.sheepFactory.createAndAssignSheep(
            this.publicConstants.LAMB_NEW_BORN_DEFAULT_NAME,
            this.sheepFactory.gender_lamb,
            femaleSheep.getFieldTheSheepIsAssignedTo(),
            false)
        }
      })
    }
  }

  private wasMatingSuccessful(femaleSheep: FemaleSheep, maleSheep: MaleSheep): boolean {
    if (this.sheepBrandingService.isAnySheepBranded(femaleSheep, maleSheep)) {
      return false;
    }
    return Math.random() >= 0.5;
  }

  private makeDidMatingOccurTemporarilyTrue(): void {
    this.didMatingProcessOccurRecently = true;
    new Promise(res => setTimeout(res, this.TIME_OF_BREAK_BETWEEN_MATING)).then(() => {
      this.didMatingProcessOccurRecently = false;
    })
  }
}
