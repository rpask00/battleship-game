import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Cord } from 'src/app/models/Cord';
import { ShipService } from 'src/app/services/ship.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'single-field',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.scss']
})
export class SingleFieldComponent implements OnInit, OnChanges {

  @Input('cord') cord: Cord;
  amIship: Observable<number>;
  constructor(
    private shipSv: ShipService
  ) { }

  ngOnInit() {

  }
  ngOnChanges() {
    this.amIship = this.shipSv.amIaShip(this.cord)
  }
}