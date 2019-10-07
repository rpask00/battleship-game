import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GemplayService } from './services/gemplay.service';
import { Router } from '@angular/router';
import { EnemyShipsService } from './services/enemy-ships.service';
import { tap } from 'rxjs/operators';
import { WebSocektService } from './services/web-socekt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {

  connectionSub: Subscription;
  winSub: Subscription;
  loseSub: Subscription;
  enemyID: Observable<string>;
  didIlose$: Observable<boolean>;
  didIwin$: Observable<any>;
  endResult: string = '';
  constructor(
    private gameplaySv: GemplayService,
    private router: Router,
    private enemySv: EnemyShipsService,
    private webSocketSv: WebSocektService
  ) {

    // this.didIwin$ = webSocketSv.listen('you-won').pipe(tap(win => {
    webSocketSv.listen('you-won').pipe(tap(win => {
      this.connectionSub.unsubscribe();
    })).subscribe(x => {
      alert('GZGZ you won!')
      this.router.navigate(['home']);
      document.location.reload()
    })

    this.router.navigate(['home']);

  }

  ngOnInit() {
    this.enemyID = this.enemySv.enemyID$.asObservable();

    this.enemyID.subscribe(id => {
      if (id) {
        this.createConnection(id)
        this.gameplaySv.isGameOver$().pipe(
          // this.didIlose$ = this.gameplaySv.isGameOver$().pipe(
          tap(igo => {
            if (igo) {
              this.webSocketSv.emit('game-over', id)
              this.connectionSub.unsubscribe()
            }
          })
        ).subscribe(x => {
          if (!x) return;

          alert('Unluko u lost!')
          this.router.navigate(['home']);
          document.location.reload()
        })
      }
    })
  }

  ngOnChanges() {
    this.endResult = '';
  }


  createConnection(id: string) {
    this.connectionSub = this.gameplaySv.createConnectionWithPlayer(id).subscribe(conn => {

      if (!conn) {
        this.connectionSub.unsubscribe()
        alert('Oponent left the game!')
        this.router.navigate(['home']);
        document.location.reload()
      }
    })
  }
}
