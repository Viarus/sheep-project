import { Injectable } from '@angular/core';
import { SheepFactoryService } from './sheep-factory.service';
import { LambSheep } from '../models/sheep/lamb-sheep-model';

@Injectable({
  providedIn: 'root'
})
export class LambSheepGrowingService {

  constructor(private sheepFactory: SheepFactoryService) { }

  private timeOfLambGrowth = 12000;

  public startGrowingProcess(lamb: LambSheep) {
    new Promise(resolve => setTimeout(resolve, this.timeOfLambGrowth)).then(() => this.onLambGrown(lamb));
  }

  private onLambGrown(lamb: LambSheep) {
    this.sheepFactory.createAndAssignSheep(lamb.getName(), this.sheepFactory.getRandomAdultSheepGender(), lamb.getFieldTheSheepIsAssignedTo());
    lamb.getFieldTheSheepIsAssignedTo().removeOneLamb();
  }
}
