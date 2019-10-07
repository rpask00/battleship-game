import { Component, OnInit } from '@angular/core';
import { Cord, Ship, Ships } from '../models/Cord';
import { ShipService } from '../services/ship.service';
import { Observable, timer, of } from 'rxjs';
import { WebSocektService } from '../services/web-socekt.service';
import { GemplayService } from '../services/gemplay.service';
import { switchMap, take } from 'rxjs/operators';
import { EnemyShipsService } from '../services/enemy-ships.service';

@Component({
  selector: 'battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BatllefieldComponent implements OnInit {


  isMytour$: Observable<number>;
  indexesArr: Number[];
  alphabetArr: String[];
  cords: Cord[] = [];
  mergedShips: Cord[] = [];
  constructor(
    private shipSv: ShipService,
    private webSocketSv: WebSocektService,
    private enemySv: EnemyShipsService,
    private gameplaySv: GemplayService
  ) {
    this.cords = shipSv.cords;
    this.indexesArr = shipSv.indexes;
    this.alphabetArr = shipSv.alphabet;
    this.isMytour$ = this.gameplaySv.isMyTour$;

  }

  ngOnInit() {
  }

}
