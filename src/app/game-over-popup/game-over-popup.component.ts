import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'game-over-popup',
  templateUrl: './game-over-popup.component.html',
  styleUrls: ['./game-over-popup.component.scss']
})
export class GameOverPopupComponent implements OnInit {
  @Input('win') win: boolean;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  dissmis() {
    this.router.navigate(['home'])
  }
}
