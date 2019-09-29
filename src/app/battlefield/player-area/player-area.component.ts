import { Component, OnInit, Input } from '@angular/core';
import { Cord } from 'src/app/models/Cord';
import { ShipService } from 'src/app/services/ship.service';

@Component({
  selector: 'player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.scss']
})
export class PlayerAreaComponent implements OnInit {
  cordsArr: Cord[];
  indexesArr: Number[];
  alphabetArr: String[];
  constructor(
    private shipSv: ShipService
  ) {
    this.cordsArr = shipSv.cords;
    this.alphabetArr = shipSv.alphabet;
    this.indexesArr = shipSv.indexes;
  }

  ngOnInit() {
  }

}
