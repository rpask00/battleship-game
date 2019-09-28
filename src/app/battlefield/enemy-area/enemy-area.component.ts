import { Component, OnInit, Input } from '@angular/core';
import { Cord } from 'src/app/models/Cord';

@Component({
  selector: 'enemy-area',
  templateUrl: './enemy-area.component.html',
  styleUrls: ['./enemy-area.component.scss']
})
export class EnemyAreaComponent implements OnInit {
  @Input('mergedShips') mergedShips: Cord[];
  @Input('cordsArr') cordsArr: Cord[];
  @Input('indexesArr') indexesArr: Number[];
  @Input('alphabetArr') alphabetArr: String[];
  constructor() { }

  ngOnInit() {
  }

}
