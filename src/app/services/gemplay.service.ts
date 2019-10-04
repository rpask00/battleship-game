import { Injectable } from '@angular/core';
import { WebSocektService } from './web-socekt.service';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { interval, forkJoin, of } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { Cord } from '../models/Cord';

@Injectable({
  providedIn: 'root'
})
export class GemplayService {

  private enemyId = new BehaviorSubject('');
  private playersID$ = new BehaviorSubject({
    attacer: '',
    defender: ''
  });
  private isMyTour = new BehaviorSubject(2);
  constructor(
    private webSocketSv: WebSocektService,
  ) {
    webSocketSv.listen('game-begin').subscribe((imt: number) => {
      this.isMyTour.next(imt);
    })

    webSocketSv.listen('get-hit').subscribe((cord: Cord) => {
      this.isMyTour.next(1);
    })
  }

  setEnemyId(id: string) {
    console.log('dupa')
    this.webSocketSv.Me.then((me: string) => {
      console.log({
        attacer: me,
        defender: id
      })
      this.playersID$.next({
        attacer: me,
        defender: id
      })

      this.enemyId.next(id);

    })
  }

  get enemyID$() {
    return this.enemyId.asObservable()
  }

  get isMyTour$() {
    return this.isMyTour.asObservable();
  }

  get playersID() {
    forkJoin([this.webSocketSv.Me, this.enemyID$]).subscribe(console.log)
    return forkJoin([this.webSocketSv.Me, this.enemyID$])
  }

  createConnectionWithPlayer(id: string) {
    return this.webSocketSv.listen('keys-share').pipe(
      map((sockets: { keys: string[] }) => {
        return sockets.keys.includes(id)
      })
    )
  }

  salva(cord: Cord) {
    this.isMyTour.next(2);
    this.playersID$.asObservable().subscribe(IDs => {

      // TODO save playes IDs with redux
      this.webSocketSv.emit('place-hit', Object.assign({ cord: cord }, IDs))
    })
  }


}
