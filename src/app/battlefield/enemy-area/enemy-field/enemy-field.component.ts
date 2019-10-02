import { Component, OnInit, Input } from '@angular/core';
import { ShipService } from 'src/app/services/ship.service';
import { Cord } from 'src/app/models/Cord';
import { Observable } from 'rxjs';
import { EnemyShipsService } from 'src/app/services/enemy-ships.service';

@Component({
  selector: 'enemy-field',
  templateUrl: './enemy-field.component.html',
  styleUrls: ['./enemy-field.component.scss']
})
export class EnemyFieldComponent implements OnInit {

  @Input('cord') cord: Cord;
  amIship: Observable<number>;
  constructor(
    private enemyShipSv: EnemyShipsService
  ) { }

  ngOnInit() { }

  ngOnChanges() {
    this.amIship = this.enemyShipSv.amIaShip(this.cord)
  }
}