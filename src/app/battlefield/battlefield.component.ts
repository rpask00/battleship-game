import { Component, OnInit } from '@angular/core';
import { Cord, Ship, Ships } from '../models/Cord';
import { ShipService } from '../services/ship.service';

@Component({
  selector: 'battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BatllefieldComponent implements OnInit {


  indexesArr: Number[];
  alphabetArr: String[];
  cords: Cord[] = [];
  mergedShips: Cord[] = [];
  ships: Ships
  constructor(
    private shipSv: ShipService
  ) {
    this.cords = shipSv.cords;
    this.indexesArr = shipSv.indexes;
    this.alphabetArr = shipSv.alphabet;
  }

  ngOnInit() {
    this.ships = this.shipSv.generateShips()
    console.log(this.ships)
    
  }

}
