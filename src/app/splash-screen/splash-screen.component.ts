import { Component, OnInit, OnChanges, OnDestroy, HostListener } from '@angular/core';
import { ShipService } from '../services/ship.service';
import { Router } from '@angular/router';
import { WebSocektService } from '../services/web-socekt.service';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  sockets$: Observable<any>;
  me$: Observable<any>;

  constructor(
    private shipSv: ShipService,
    private router: Router,
    private webSocketSv: WebSocektService
  ) {
    shipSv.generateShips()
  }

  ngOnInit() {
    this.webSocketSv.emit('creating-connection', this.shipSv.ships)
    this.sockets$ = this.webSocketSv.listen('keys-share');
    this.me$ = this.webSocketSv.listen('me')

    // this.webSocketSv.listen('keys-share').pipe(
    //   switchMap(sockets => {
    //     return this.webSocketSv.listen('me')
    //   }),
    //   map(data => {
    //     console.log('data')
    //     return data
    //   })
    // ).subscribe(d => {
    //   console.log(d)
    // })
  }

  startTheGame() {
    this.router.navigate(['/play'])
  }

  reDeploy() {
    this.shipSv.generateShips()
  }

  invite(socket: string) {
    console.log(socket)
  }

}
