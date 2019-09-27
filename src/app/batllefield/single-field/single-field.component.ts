import { Component, OnInit, Input } from '@angular/core';
import { Cord } from 'src/app/models/Cord';

@Component({
  selector: 'single-field',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.scss']
})
export class SingleFieldComponent implements OnInit {

  @Input('cord') cord: Cord;
  constructor() { }

  ngOnInit() {
   }

}
