import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'invite-pop-up',
  templateUrl: './invite-pop-up.component.html',
  styleUrls: ['./invite-pop-up.component.scss']
})
export class InvitePopUpComponent implements OnInit {


  @Input('invitation') invitation;
  constructor() { }

  ngOnInit() { }

  acceptInvitation() {

  }

  rejectInvitation() {

  }

}
