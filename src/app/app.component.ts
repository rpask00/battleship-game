import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {

  connectionSub: Subscription;
  enemyID: Observable<string>;
  didIlose$: Observable<boolean>
  didIwin$: Observable<any>
  constructor(
    private gameplaySv: GemplayService,
    private router: Router,
    private enemySv: EnemyShipsService,
    private webSocketSv: WebSocektService
  ) {

    this.didIwin$ = webSocketSv.listen('you-won').pipe(tap(win => {
      this.router.navigate(['home'])
      document.location.reload()
    }))
  }

  ngOnInit() {
    this.enemyID = this.enemySv.enemyID$.asObservable();

    this.enemyID.subscribe(id => {
      if (id) {
        this.createConnection(id)
        this.didIlose$ = this.gameplaySv.isGameOver$().pipe(
          tap(igo => {
            if (igo) {
              this.webSocketSv.emit('game-over', id)
              this.router.navigate(['home']);
              document.location.reload()
            }
          })
        )
      }
    })
  }

  createConnection(id: string) {
    this.connectionSub = this.gameplaySv.createConnectionWithPlayer(id).subscribe(conn => {

      if (!conn) {
        this.router.navigate(['home']);
        this.connectionSub.unsubscribe()
        alert('Oponent left the game!')
      }
    })
  }
}
