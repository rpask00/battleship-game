import { Component, OnInit, Input } from '@angular/core';
import { ShipService } from 'src/app/services/ship.service';
import { Cord } from 'src/app/models/Cord';
import { Observable, of } from 'rxjs';
import { EnemyShipsService } from 'src/app/services/enemy-ships.service';
import { take, switchMap } from 'rxjs/operators';
import { GemplayService } from 'src/app/services/gemplay.service';

@Component({
  selector: 'enemy-field',
  templateUrl: './enemy-field.component.html',
  styleUrls: ['./enemy-field.component.scss']
})
export class EnemyFieldComponent implements OnInit {

  @Input('cord') cord: Cord;
  @Input('imt') imt: number;
  amIship: Observable<number>;
  amIActive$: Observable<number>;
  constructor(
    private enemyShipSv: EnemyShipsService,
    private gameplaySv: GemplayService
  ) {

    gameplaySv.playersID.subscribe(console.log)
  }
  /*
      3 is active
      4 is not active :  {
        1 = is ship
        2 = is not ship
 }*/

  ngOnInit() { }

  ngOnChanges() {
    this.amIActive$ = this.enemyShipSv.amIactive$(this.cord).pipe(
      take(1),
      switchMap(ama => {
        // {ship: ama == 1, clearField:ama==3, empty:ama==2 }

        if (ama == 4) return this.enemyShipSv.amIaShip(this.cord)

        return of(ama)
      })
    )
  }

  salva(ama: number) {
    if (this.imt == 1 && ama == 3) {
      console.log('pipiuiu')
      this.gameplaySv.salva(this.cord)
    } else return
  }
}