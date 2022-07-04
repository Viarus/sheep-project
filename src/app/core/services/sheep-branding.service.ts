import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractSheep } from '../models/sheep/abstract-sheep-model';

@Injectable({
  providedIn: 'root'
})
export class SheepBrandingService {

  private sheepIsBrandedSubject: Subject<number> = new Subject<number>();

  constructor() {
  }

  public brandSheep(sheep: AbstractSheep): void {
    sheep.setIsBranded(true);
    this.sheepIsBrandedSubject.next(0);
  }

  public getSheepIsBrandedSubject(): Subject<number> {
    return this.sheepIsBrandedSubject;
  }

  public isAnySheepBranded(...sheep: AbstractSheep[]): boolean {
    let result = false;
    for (let i = 0; i < sheep.length; i++) {
      if (sheep[i].isBranded()) {
        result = true;
        break;
      }
    }
    return result;
  }
}
