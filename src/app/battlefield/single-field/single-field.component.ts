import { Component, OnInit, Input } from '@angular/core';
import { Cord } from 'src/app/models/Cord';
import { ShipService } from 'src/app/services/ship.service';

@Component({
  selector: 'single-field',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.scss']
})
export class SingleFieldComponent implements OnInit {

  @Input('cord') cord: Cord;
  @Input('mergedShips') mergedShips: Cord[];
  amIship: boolean;
  constructor(
    private shipSv: ShipService
  ) { }

  ngOnInit() {
    this.amIship = this.shipSv.amIaShip(this.cord);
  }

}
