import { Component, OnInit, Input } from '@angular/core';
import { Cord } from 'src/app/models/Cord';

@Component({
  selector: 'single-field',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.scss']
})
export class SingleFieldComponent implements OnInit {

  @Input('cord') cord: Cord;
  @Input('mergedShips') mergedShips: Cord[];
  amIship: boolean;
  constructor() { }

  ngOnInit() {
    this.amIship = this.mergedShips.findIndex(shipCord => shipCord.x == this.cord.x && shipCord.y == this.cord.y) !== -1
  }

}
