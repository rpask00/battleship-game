import { Injectable } from '@angular/core';
import { WebSocektService } from './web-socekt.service';
import { map, take } from 'rxjs/operators';
import { interval } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Injectable({
  providedIn: 'root'
})
export class GemplayService {

  private enemyId = new BehaviorSubject('');
  private isMyTour = new BehaviorSubject(2);
  constructor(
    private webSocketSv: WebSocektService,
  ) {
    webSocketSv.listen('game-begin').subscribe((imt: number) => this.isMyTour.next(imt))
  }

  setEnemyId(id: string) {
    this.enemyId.next(id);
  }

  get enemyID$() {
    return this.enemyId.asObservable();
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
