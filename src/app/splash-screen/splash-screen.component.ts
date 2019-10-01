import { Component, OnInit, OnChanges, OnDestroy, HostListener } from '@angular/core';
import { ShipService } from '../services/ship.service';
import { Router } from '@angular/router';
import { WebSocektService } from '../services/web-socekt.service';
import { Observable, forkJoin, of, timer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  sockets$: Observable<any>;
  me$: Observable<any>;
  MePromise: Promise<any>;
  invitation$: Observable<any>
  constructor(
    private shipSv: ShipService,
    private router: Router,
    private webSocketSv: WebSocektService
  ) {
    shipSv.generateShips()
  }

  async ngOnInit() {
    this.webSocketSv.emit('creating-connection', this.shipSv.ships)
    this.me$ = this.webSocketSv.listen('me');

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
      })
    )

    this.invitation$ = this.webSocketSv.listen('invitation')

  }

  startTheGame() {
    this.router.navigate(['/play'])
  }

  reDeploy() {
    this.shipSv.generateShips()
  }

  invite(socket: string) {
    this.MePromise.then(me => {
      const { mySocket } = me;
      this.webSocketSv.emit('invite', {
        addressee: socket,
        sender: mySocket
      })
    })
  }

}
