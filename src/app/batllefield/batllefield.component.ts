import { Component, OnInit } from '@angular/core';
import { Cord, Ship } from '../models/Cord';

@Component({
  selector: 'batllefield',
  templateUrl: './batllefield.component.html',
  styleUrls: ['./batllefield.component.scss']
})
export class BatllefieldComponent implements OnInit {

  indexesArr: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  alphabetArr: String[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  seaIndexes: Cord[][] = [
    [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }, { x: 1, y: 6 }, { x: 1, y: 7 }, { x: 1, y: 8 }, { x: 1, y: 9 }, { x: 1, y: 10 }],
    [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 2, y: 7 }, { x: 2, y: 8 }, { x: 2, y: 9 }, { x: 2, y: 10 }],
    [{ x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 }, { x: 3, y: 9 }, { x: 3, y: 10 }],
    [{ x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 4, y: 7 }, { x: 4, y: 8 }, { x: 4, y: 9 }, { x: 4, y: 10 }],
    [{ x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }, { x: 5, y: 8 }, { x: 5, y: 9 }, { x: 5, y: 10 }],
    [{ x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 }, { x: 6, y: 9 }, { x: 6, y: 10 }],
    [{ x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 }, { x: 7, y: 5 }, { x: 7, y: 6 }, { x: 7, y: 7 }, { x: 7, y: 8 }, { x: 7, y: 9 }, { x: 7, y: 10 }],
    [{ x: 8, y: 1 }, { x: 8, y: 2 }, { x: 8, y: 3 }, { x: 8, y: 4 }, { x: 8, y: 5 }, { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 8, y: 8 }, { x: 8, y: 9 }, { x: 8, y: 10 }],
    [{ x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 }, { x: 9, y: 8 }, { x: 9, y: 9 }, { x: 9, y: 10 }],
    [{ x: 10, y: 1 }, { x: 10, y: 2 }, { x: 10, y: 3 }, { x: 10, y: 4 }, { x: 10, y: 5 }, { x: 10, y: 6 }, { x: 10, y: 7 }, { x: 10, y: 8 }, { x: 10, y: 9 }, { x: 10, y: 10 }],
  ];


  constructor() { }

  randN(start?: number, end?: number): number {
    start = start || 0;
    end = end || 10;
    return Math.floor(Math.random() * (end - start + 1)) + start;
  }


  ngOnInit() {
    console.log(this.generateShip(3).cords)
    // this.clearAreaAround(ship4)
    // vertical = Math.random() < 0.5;
    // for (let i = 0; i < 3; i++) {

    // }

    // vertical = Math.random() < 0.5;
    // for (let i = 0; i < 3; i++) {

    // }

    // vertical = Math.random() < 0.5;
    // for (let i = 0; i < 2; i++) {

    // }

    // vertical = Math.random() < 0.5;
    // for (let i = 0; i < 2; i++) {

    // }

    // vertical = Math.random() < 0.5;
    // for (let i = 0; i < 2; i++) {

    // }
  }

  clearAreaAround(ship: Ship) {
    let cordsToDelete: Cord[] = [];
    ship.cords.forEach(cord => {
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          if (cord.x + x <= 10 && cord.y + y <= 10 && cord.x + x > 0 && cord.y + y > 0) {
            cordsToDelete.push(({ x: cord.x + x, y: cord.y + y }))
          }
        }
      }
    })
    // let arrOfIndexesToDelete = cordsToDelete.map(cord => {
    //   let firstIndex = cord.x - 1;
    //   let secondIndex = this.seaIndexes[firstIndex].findIndex(cordFromArr => {
    //     return cordFromArr.y == cord.y
    //   })
    //   return { firstIndex, secondIndex }
    // })

    // arrOfIndexesToDelete.sort((a, b) => b.secondIndex - a.secondIndex).forEach(index => {
    //   this.seaIndexes[index.firstIndex].splice(index.secondIndex, 1)
    // })

  }


  generateShip(shipLenght: number) {
    let isVertical = Math.random() < 0.5;
    let index: Cord
    while (!this.isFieldEmpty(index))
      index = { x: this.randN(0, 10 - shipLenght + 1), y: this.randN(0, 10 - shipLenght + 1) }

    let ship = new Ship([index])
    for (let i = 0; i < shipLenght - 1; i++) {
      if (isVertical)
        ship.addCord({ x: index.x, y: ship.lastCord.y + 1 })
      else
        ship.addCord({ x: ship.lastCord.x + 1, y: index.y })
    }
    return ship
  }

  private isFieldEmpty(cord: Cord) {
    if (!cord) return false
    let copyofArray: Cord[] = (this.seaIndexes as any).flatMap(x => x)

    return copyofArray.findIndex(c => c.x == cord.x && c.y == cord.y) !== -1
  }

}
