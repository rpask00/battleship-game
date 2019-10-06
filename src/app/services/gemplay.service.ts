import { Injectable } from '@angular/core';
import { WebSocektService } from './web-socekt.service';
import { map, take, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cord, Ship } from '../models/Cord';
import { EnemyShipsService } from './enemy-ships.service';
import { ShipService } from './ship.service';

@Injectable({
  providedIn: 'root'
})
export class GemplayService {

  private isMyTour = new BehaviorSubject(2);

  constructor(
    private webSocketSv: WebSocektService,
    private enemySv: EnemyShipsService,
    private shipSv: ShipService,
  ) {
    webSocketSv.listen('game-begin').subscribe((imt: number) => {
      this.isMyTour.next(imt);
    })

    webSocketSv.listen('get-hit').subscribe((cordsToDelete: Cord[]) => {
      shipSv.getHit(cordsToDelete).pipe(
        take(1)
      ).subscribe(hit => {
        this.isMyTour.next(hit ? 2 : 1);
      })
    })

  }


  salva(cord: Cord) {
    this.enemySv.enemyID$.pipe(take(1)).subscribe(eID => {

      this.enemySv.fire(cord).pipe(take(1)).subscribe((hitOrShip: boolean | Ship) => {

        let cordsToDelete = [cord]

        if (hitOrShip !== true && hitOrShip !== false)
          cordsToDelete = this.shipSv.getCordsToDelete(hitOrShip)


        this.webSocketSv.emit('place-hit', { cordsToDelete, attacker: this.shipSv.myId, defender: eID })

        this.isMyTour.next(hitOrShip ? 1 : 2)
      })
    })

  }

  setEnemyId(id: string) {
    this.enemySv.enemyID$.next(id);
  }

  get isMyTour$() {
    return this.isMyTour.asObservable();
  }

  createConnectionWithPlayer(id: string) {
    return this.webSocketSv.listen('keys-share').pipe(
      map((sockets: { keys: string[] }) => {
        return sockets.keys.includes(id)
      })
    )
  }

  isGameOver$(): Observable<boolean> {
    return this.shipSv.hitsssss.asObservable().pipe(
      mergeMap(hits => {
        return this.shipSv.mergedShipsObs.asObservable().pipe(
          map(merged => {
            hits = hits.map(hit => hit.x + '' + hit.y)
            merged = merged.map(cord => cord.x + '' + cord.y)
            let isgameOver = []
            merged.forEach(m => isgameOver.push(hits.findIndex(h => h == m)))

            return isgameOver.indexOf(-1) == -1
          })
        )
      })
    )
  }

}
