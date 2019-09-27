export class Cord {
    x: number;
    y: number;
}

export class Ship {
    cords: Cord[] = [];

    constructor(cords?: Cord[]) {
        if (cords) this.cords = cords;
    }
    get lastCord() {
        return this.cords.slice(-1)[0]
    }
    get firstCord() {
        return this.cords.slice(0, 1)[0]
    }


    clearCords() {
        this.cords = []
    }

    addCord(cord: Cord) {
        this.cords.push(cord)
    }
}

export interface Ships {
    ship4: Ship;
    ship3a: Ship;
    ship3b: Ship;
    ship2a: Ship;
    ship2b: Ship;
    ship2c: Ship;
    ship1a: Ship;
    ship1b: Ship;
    ship1c: Ship;
    ship1d: Ship;
}