import { Component, OnInit, Input } from '@angular/core';
import { ShipService } from 'src/app/services/ship.service';
import { Cord } from 'src/app/models/Cord';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { EnemyShipsService } from 'src/app/services/enemy-ships.service';
import { take, switchMap, map } from 'rxjs/operators';
import { GemplayService } from 'src/app/services/gemplay.service';

@Component({
  selector: 'enemy-field',
  templateUrl: './enemy-field.component.html',
  styleUrls: ['./enemy-field.component.scss']
})
export class EnemyFieldComponent implements OnInit {

  @Input('cord') cord: Cord;
  @Input('imt') imt: number;
  private hitss: Observable<Cord[]>;
  amIship: Observable<number>;
  typeOfField$: Observable<number>;
  constructor(
    private enemyShipSv: EnemyShipsService,
    private gameplaySv: GemplayService
  ) { }

  ngOnInit() {
    this.hitss = this.enemyShipSv.hitmarks.asObservable();

    this.typeOfField$ = this.isFieldActive(this.cord).pipe(
      switchMap(ama => {
        if (ama == 4) return this.amIaShip(this.cord)
        return of(ama)
      })
    )
  }

  ngOnChanges() { }

  salva(ama: number) {
    if (this.imt == 1 && ama == 3) {
      this.gameplaySv.salva(this.cord)
    } else return
  }

  isFieldActive(cord: Cord) {
    return this.hitss.pipe(
      map(marks => {
        // 3 is active
        // 4 is not active
        return marks.findIndex(shipCord => shipCord.x == cord.x && shipCord.y == cord.y) === -1 ? 3 : 4;
      })
    )
  }


  amIaShip(cord: Cord): Observable<number> {
    return this.enemyShipSv.mergedShipsObs.asObservable().pipe(
      map(merged => {
        // 1 = is ship
        // 2 = is not ship
        return merged.findIndex(shipCord => shipCord.x == cord.x && shipCord.y == cord.y) !== -1 ? 1 : 2;
      })
    )
  }

}

/*
    3 is active
    4 is not active :  {
      1 = is ship
      2 = is not ship
}*/
