import { Injectable } from '@angular/core';
import { Cord, Ships, Ship } from '../models/Cord';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShipService } from './ship.service';

@Injectable({
  providedIn: 'root'
})
export class EnemyShipsService {

  private cordsArr: Cord[] = [];
  enemyShips = new BehaviorSubject<Ships>(null);
  hitmarks = new BehaviorSubject([]);
  private mergedShip = new BehaviorSubject([])

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
        return this.mergedShip.next(mergedShipsArr)
      }
    })
  }


  uploadEnemyShips(ships: Ships) {
    this.mergeShips(ships)
    this.enemyShips.next(ships)
  }

  amIaShip(cord: Cord): Observable<number> {
    return this.hitmarks.asObservable().pipe(
      map(merged => {
        return merged.findIndex(shipCord => shipCord.x == cord.x && shipCord.y == cord.y) !== -1 ? 1 : 2;
      })
    )
  }



}