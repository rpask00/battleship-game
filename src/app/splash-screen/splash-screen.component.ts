import { Component, OnInit } from '@angular/core';
import { Sortable } from '@shopify/draggable'

@Component({
  selector: 'splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
  indexesArr: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  alphabetArr: String[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  constructor() { }

  ngOnInit() { }

}
