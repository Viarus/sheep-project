import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractSheep } from '../models/sheep/abstract-sheep-model';

@Injectable({
  providedIn: 'root'
})
export class SheepBrandingService {

  private sheepBrandingEventSubject: Subject<void> = new Subject<void>();

  constructor() {
  }

  public brandSheep(sheep: AbstractSheep): void {
    sheep.setIsBranded(true);
    this.sheepBrandingEventSubject.next();
  }

  public getSheepIsBrandedSubject(): Subject<void> {
    return this.sheepBrandingEventSubject;
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
