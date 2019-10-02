import { Injectable } from '@angular/core';
import { WebSocektService } from './web-socekt.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GemplayService {

  private enemyId = new BehaviorSubject('');
  constructor(
    private webSocketSv: WebSocektService,
  ) { }

  setEnemyId(id: string) {
    this.enemyId.next(id);
  }

  get enemyID$() {
    return this.enemyId.asObservable()
  }

  createConnectionWithPlayer(id: string) {
    return this.webSocketSv.listen('keys-share').pipe(
      map((sockets: { keys: string[] }) => {
        return sockets.keys.includes(id)
      })
    )
  }


}
