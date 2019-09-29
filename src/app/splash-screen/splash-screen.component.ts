import { Component, OnInit, OnChanges } from '@angular/core';
import { Sortable } from '@shopify/draggable'
import { ShipService } from '../services/ship.service';

@Component({
  selector: 'splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit, OnChanges {
  stattrack: number = 0;
  constructor(
    private shipSv: ShipService
  ) {
    shipSv.generateShips()
  }

  ngOnInit() { }
  ngOnChanges() {
    console.log(this.stattrack)
  }

  startTheGame() {

  }

  reDeploy() {
    this.stattrack++;
    this.shipSv.generateShips()
  }

}
