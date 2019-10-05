import { Injectable } from '@angular/core';
import { WebSocektService } from './web-socekt.service';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { interval, forkJoin, of } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { Cord } from '../models/Cord';
import { EnemyShipsService } from './enemy-ships.service';
import { ShipService } from './ship.service';

@Injectable({
  providedIn: 'root'
})
export class GemplayService {

  enemyId: string;
  private isMyTour = new BehaviorSubject(2);
  constructor(
    private webSocketSv: WebSocektService,
    private enemySv: EnemyShipsService,
    private shipSv: ShipService,
  ) {
    webSocketSv.listen('game-begin').subscribe((imt: number) => {
      this.isMyTour.next(imt);
    })

    // webSocketSv.listen('get-hit').pipe(
    //   switchMap((cord: Cord) => {
    //     console.log(cord)
    //     return enemySv.didIhit$(cord)
    //   })
    // ).subscribe(dih => {
    //   console.log(dih)
    //   if (dih == 5)
    //     this.isMyTour.next(1);
    //   else
    //     this.isMyTour.next(2);
    // })
  }

  setEnemyId(id: string) {
    this.enemySv.enemyID$.next(id);
    this.enemyId = id;
  }


  get isMyTour$() {
    return this.isMyTour.asObservable();
  }

  // get playersID() {
  //   forkJoin([this.webSocketSv.Me, this.enemyID$]).subscribe(console.log)
  //   return forkJoin([this.webSocketSv.Me, this.enemyID$])
  // }

  createConnectionWithPlayer(id: string) {
    return this.webSocketSv.listen('keys-share').pipe(
      map((sockets: { keys: string[] }) => {
        return sockets.keys.includes(id)
      })
    )
  }

  salva(cord: Cord) {
    this.webSocketSv.emit('place-hit', { cord, attacker: this.shipSv.myId, defender: this.enemyId })
  }


}
