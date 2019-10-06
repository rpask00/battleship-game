import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Cord } from 'src/app/models/Cord';
import { ShipService } from 'src/app/services/ship.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, flatMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'single-field',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.scss']
})
export class SingleFieldComponent implements OnInit {

  @Input('cord') cord: Cord;
  @Input('imt') imt: number;

  amIship: Observable<number>;
  hitss: BehaviorSubject<Cord[]>;
  amI$: Observable<number>;

  constructor(
    private shipSv: ShipService
  ) { }

  ngOnInit() {
    this.hitss = this.shipSv.hitsssss;
    this.amI$ = this.typeOfField(this.cord);
  }

  typeOfField(cord: Cord): Observable<number> {
    return this.hitss.asObservable().pipe(
      mergeMap(hits => {
        return this.shipSv.mergedShipsObs.asObservable().pipe(
          map(merged => {
            let index = merged.findIndex(shipCord => shipCord.x == cord.x && shipCord.y == cord.y)
            if (index == -1) {
              // cord is not a ship
              // 4 is clear field
              // 3 is empty field
              return hits.findIndex(mar => mar.x == cord.x && mar.y == cord.y) == -1 ? 4 : 3;
            } else {
              // cord is ship
              // 2 is ship
              // 1 is shot ship
              return hits.findIndex(mar => mar.x == cord.x && mar.y == cord.y) == -1 ? 2 : 1;
            }
          })
        )
      })
    )
  }
}