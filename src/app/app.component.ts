import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GemplayService } from './services/gemplay.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  connectionSub: Subscription;
  connectionWithEnemy: Observable<string>;
  constructor(
    private gemplaySv: GemplayService,
    private router: Router
  ) { }

  ngOnInit() {
    this.connectionWithEnemy = this.gemplaySv.enemyID$;

    this.connectionWithEnemy.subscribe(id => {
      if (id) this.createConnection(id)
    })
  }

  createConnection(id: string) {
    this.connectionSub = this.gemplaySv.createConnectionWithPlayer(id).subscribe(conn => {

      if (!conn) {
        this.connectionSub.unsubscribe()
        alert('Oponent left the game!')
        this.router.navigate(['home']);
      }
    })
  }
}
