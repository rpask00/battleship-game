import { Component, OnInit, Input } from '@angular/core';
import { Cord } from 'src/app/models/Cord';

@Component({
  selector: 'player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.scss']
})
export class PlayerAreaComponent implements OnInit {
  @Input('mergedShips') mergedShips: Cord[];
  @Input('cordsArr') cordsArr: Cord[];
  @Input('indexesArr') indexesArr: Number[];
  @Input('alphabetArr') alphabetArr: String[];
  constructor() { }

  ngOnInit() {
  }

}
