import { Injectable } from '@angular/core';
import { Cord, Ships } from '../models/Cord';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ShipService } from './ship.service';

@Injectable({
  providedIn: 'root'
})
export class EnemyShipsService {

  private cordsArr: Cord[] = [];
  enemyShips = new BehaviorSubject<Ships>(null);
  enemyID$ = new BehaviorSubject('');
  hitmarks = new BehaviorSubject([]);
  // private mergedShips: Cord[] = [];
  mergedShipsObs = new BehaviorSubject([]);

  constructor(
    private shipSv: ShipService
  ) {
    this.cordsArr = shipSv.cords
  }

  private mergeShips(ships: Ships) {
    this.enemyShips.asObservable().subscribe(enemyShips => {
      if (!enemyShips) return
      else {
        let mergedShipsArr = []
        for (let shipName in enemyShips) {
          mergedShipsArr = mergedShipsArr.concat(enemyShips[shipName].cords)
        }
        this.mergedShipsObs.next(mergedShipsArr)
        // return this.mergedShips = mergedShipsArr
      }
    })
  }
  // this function update hitmarks and return if shot was accurate
  fire(cord: Cord) {
    this.hitmarks.asObservable().pipe(take(1)).subscribe(marks => this.hitmarks.next(marks.concat([cord])))

    return this.mergedShipsObs.pipe(
      map(merged => merged.findIndex(shipCord => shipCord.x == cord.x && shipCord.y == cord.y) !== -1)
    )
  }


  uploadEnemyShips(ships: Ships) {
    this.mergeShips(ships)
    this.enemyShips.next(ships)
  }


}