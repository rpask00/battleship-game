import { Component, OnInit, OnChanges, OnDestroy, HostListener } from '@angular/core';
import { ShipService } from '../services/ship.service';
import { Router } from '@angular/router';
import { WebSocektService } from '../services/web-socekt.service';
import { Observable, forkJoin, of, timer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { EnemyShipsService } from '../services/enemy-ships.service';
import { GemplayService } from '../services/gemplay.service';

@Component({
  selector: 'splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  accept$: Observable<any>
  sockets$: Observable<any>;
  me$: Observable<any>;
  MePromise: Promise<any>;
  invitation$: Observable<any>
  constructor(
    private shipSv: ShipService,
    private enemyShipSv: EnemyShipsService,
    private router: Router,
    private webSocketSv: WebSocektService,
    private gemplaySv: GemplayService,
  ) {
    shipSv.generateShips()
  }

  ngOnInit() {
    this.webSocketSv.emit('creating-connection', this.shipSv.ships)
    this.me$ = this.webSocketSv.listen('me');
    this.invitation$ = this.webSocketSv.listen('invitation')
    this.accept$ = this.webSocketSv.listen('onAccept')

    this.MePromise = this.webSocketSv.Me;
    // filtration sockets thats differ from my socket
    this.sockets$ = this.webSocketSv.listen('keys-share').pipe(
      switchMap(socks => {
        return forkJoin([this.MePromise, of(socks)])
      }),
      map(arr => {
        let keys = (arr[1] as any).keys;
        let me = (arr[0] as any).mySocket;
        return keys.filter(s => s != me)
      }))

    this.accept$.subscribe(accept => {
      this.gemplaySv.setEnemyId(accept.addressee);
      this.enemyShipSv.uploadEnemyShips(accept.ships);
      this.router.navigate(['play']);
    })

  }

  startTheGame() {
    this.router.navigate(['/play']);
  }

  reDeploy() {
    this.shipSv.generateShips();
  }

  invite(socket: string) {
    this.MePromise.then(me => {
      const { mySocket } = me;
      this.webSocketSv.emit('invite', {
        addressee: socket,
        sender: mySocket,
        ships: this.shipSv.ships
      })
    });
  }

}
