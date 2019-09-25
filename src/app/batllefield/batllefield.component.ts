import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'batllefield',
  templateUrl: './batllefield.component.html',
  styleUrls: ['./batllefield.component.scss']
})
export class BatllefieldComponent implements OnInit {

  indexesArr: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  alphabetArr: String[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  constructor() { }

  ngOnInit() {
  }

}
