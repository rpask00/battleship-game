import { Component, OnInit } from '@angular/core';
import { Sortable } from '@shopify/draggable'
import { ShipService } from '../services/ship.service';

@Component({
  selector: 'splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
  constructor(
    private shipSv: ShipService
  ) {
    shipSv.generateShips()
  }

  ngOnInit() { }

}
