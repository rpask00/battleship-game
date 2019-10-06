import { Injectable } from '@angular/core';
import { Cord, Ships, Ship } from '../models/Cord';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { take, map, mergeMap } from 'rxjs/operators';
import { ShipService } from './ship.service';

@Injectable({
  providedIn: 'root'
})
export class EnemyShipsService {

  private cordsArr: Cord[] = [];
  enemyShips = new BehaviorSubject<Ships>(null);
  enemyID$ = new BehaviorSubject('');
  hitmarks = new BehaviorSubject([]);
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
      mergeMap(merged => {
        let ifHit = merged.findIndex(shipCord => shipCord.x == cord.x && shipCord.y == cord.y) !== -1;
        // if shot was not accurate return false
        if (!ifHit) return of(ifHit)
        // if shot was accurate check if ship is completly destroyed
        else {
          //fetching hitmarks
          return this.hitmarks.asObservable().pipe(
            take(1),
            mergeMap(hits => {
              // looking for a ship that was hit
              return this.findShip(cord).pipe(
                map(ship => {
                  let arrOfHits = []
                  ship.cords.forEach(cord => {
                    arrOfHits.push(hits.findIndex(hit => hit.x == cord.x && hit.y == cord.y))
                  })

                  // return true if ship was hit, and return ship if was completly destroyed
                  if (arrOfHits.indexOf(-1) == -1) {
                    // add destroyed ship to hitmarks
                    let cordsToDelete = this.shipSv.getCordsToDelete(ship)
                    this.hitmarks.asObservable().pipe(take(1)).subscribe(marks => this.hitmarks.next(marks.concat(cordsToDelete)))

                    return ship
                  }
                  return true
                })
              )
            })
          )
        }
      })
    )
  }


  uploadEnemyShips(ships: Ships) {
    this.mergeShips(ships)
    this.enemyShips.next(ships)
  }

  private findShip(cord: Cord): Observable<Ship> {
    return this.enemyShips.asObservable().pipe(
      map((ships: Ships) => {
        let myShip: Ship;
        for (let ship in ships) {
          let index = ships[ship].cords.findIndex((shipCord: Cord) => shipCord.x == cord.x && shipCord.y == cord.y);
          if (index !== -1) myShip = ships[ship];
        }

        return myShip
      })
    )
  }

}