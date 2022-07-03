import { Injectable } from '@angular/core';
import { SheepFactoryService } from './sheep-factory.service';

@Injectable({
  providedIn: 'root'
})
export class LambSheepGrowingService {

  constructor(private sheepFactory: SheepFactoryService) { }
}
