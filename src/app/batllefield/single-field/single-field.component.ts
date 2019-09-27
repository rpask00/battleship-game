import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'single-field',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.scss']
})
export class SingleFieldComponent implements OnInit {

  @Input('fieldID') fieldID: string;
  constructor() { }

  ngOnInit() { }

}
