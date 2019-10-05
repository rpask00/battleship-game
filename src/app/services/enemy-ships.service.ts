import { Injectable } from '@angular/core';
import { Cord, Ships, Ship } from '../models/Cord';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { ShipService } from './ship.service';

@Injectable({
  providedIn: 'root'
})
export class EnemyShipsService {

  private cordsArr: Cord[] = [];
  enemyShips = new BehaviorSubject<Ships>(null);
  enemyID$ = new BehaviorSubject('');
  hitmarks = new BehaviorSubject([]);
  private mergedShips = new BehaviorSubject([])

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
        return this.mergedShips.next(mergedShipsArr)
      }
    })
  }

  amIactive$(cord: Cord) {
    return this.hitmarks.pipe(
      take(1),
      map(marks => {
        // 3 is active
        // 4 is not active
        return marks.findIndex(shipCord => shipCord.x == cord.x && shipCord.y == cord.y) === -1 ? 3 : 4;
      })
    )
  }


  uploadEnemyShips(ships: Ships) {
    this.mergeShips(ships)
    this.enemyShips.next(ships)
  }

  amIaShip(cord: Cord): Observable<number> {
    return this.hitmarks.asObservable().pipe(
      map(merged => {
        // 1 = is ship
        // 2 = is not ship
        return merged.findIndex(shipCord => shipCord.x == cord.x && shipCord.y == cord.y) !== -1 ? 1 : 2;
      })
    )
  }



}