import { Injectable } from '@angular/core';
import { WebSocektService } from './web-socekt.service';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Cord } from '../models/Cord';
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

    webSocketSv.listen('get-hit').subscribe((cord: Cord) => {
      shipSv.getHit(cord).pipe(
        take(1)
      ).subscribe(hit => {
        if (hit) {
          this.isMyTour.next(2);
        } else {
          this.isMyTour.next(1);
        }
      })
    })
  }


  salva(cord: Cord) {
    this.enemySv.enemyID$.pipe(take(1)).subscribe(eID => {
      this.webSocketSv.emit('place-hit', { cord, attacker: this.shipSv.myId, defender: eID })

      this.enemySv.fire(cord).pipe(take(1)).subscribe(hit => this.isMyTour.next(hit ? 1 : 2))
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

}
