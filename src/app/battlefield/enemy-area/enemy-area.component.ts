import { Component, OnInit, Input } from '@angular/core';
import { Cord } from 'src/app/models/Cord';
import { ShipService } from 'src/app/services/ship.service';

@Component({
  selector: 'enemy-area',
  templateUrl: './enemy-area.component.html',
  styleUrls: ['./enemy-area.component.scss']
})
export class EnemyAreaComponent implements OnInit {
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
