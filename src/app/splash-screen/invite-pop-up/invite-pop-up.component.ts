import { Component, OnInit, Input } from '@angular/core';
import { WebSocektService } from 'src/app/services/web-socekt.service';
import { Ships } from 'src/app/models/Cord';
import { ShipService } from 'src/app/services/ship.service';
import { EnemyShipsService } from 'src/app/services/enemy-ships.service';
import { Router } from '@angular/router';
import { GemplayService } from 'src/app/services/gemplay.service';

@Component({
  selector: 'invite-pop-up',
  templateUrl: './invite-pop-up.component.html',
  styleUrls: ['./invite-pop-up.component.scss']
})
export class InvitePopUpComponent implements OnInit {

  @Input('invitation') invitation: any;
  ships: Ships = this.shipSv.ships;
  constructor(
    private webSocketSv: WebSocektService,
    private shipSv: ShipService,
    private enemyShipSv: EnemyShipsService,
    private router: Router,
    private gemplaySv: GemplayService
  ) { }

  ngOnInit() {
  }

  acceptInvitation() {
    this.gemplaySv.setEnemyId(this.invitation.sender)
    this.enemyShipSv.uploadEnemyShips(this.invitation.ships);
    this.webSocketSv.emit('accept', Object.assign({ ships: this.ships }, this.invitation));
    this.router.navigate(['play']);
  }

  rejectInvitation() {
    this.webSocketSv.emit('reject', { me: this.invitation.addressee });
  }

}
