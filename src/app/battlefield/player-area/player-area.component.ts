import { Component, OnInit, Input } from '@angular/core';
import { Cord } from 'src/app/models/Cord';
import { ShipService } from 'src/app/services/ship.service';
import { Observable } from 'rxjs';
import { GemplayService } from 'src/app/services/gemplay.service';

@Component({
  selector: 'player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.scss']
})
export class PlayerAreaComponent implements OnInit {
  cordsArr: Cord[];
  indexesArr: Number[];
  alphabetArr: String[];
  imt$: Observable<number>;
  constructor(
    private shipSv: ShipService,
    private gameplaySv: GemplayService,
  ) {
    this.cordsArr = shipSv.cords;
    this.alphabetArr = shipSv.alphabet;
    this.indexesArr = shipSv.indexes;
    this.imt$ = gameplaySv.isMyTour$;
  }

  ngOnInit() {
  }

}
