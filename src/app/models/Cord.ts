export class Cord {
    x: number;
    y: number;
}

export class Ship {
    cords: Cord[];

    constructor(cords: Cord[]) {
        this.cords = cords;
    }
    get lastCord() {
        return this.cords.slice(-1)[0]
    }

    get firstCord() {
        return this.cords.slice(0, 1)[0]
    }

    get highestX() {
        return this.cords.map(cord => cord.x).sort((a, b) => b - a)[0]
    }
    get highestY() {
        return this.cords.map(cord => cord.y).sort((a, b) => b - a)[0]
    }
    get lowestX() {
        return this.cords.map(cord => cord.x).sort((a, b) => b - a).reverse()[0]
    }
    get lowestY() {
        return this.cords.map(cord => cord.x).sort((a, b) => b - a).reverse()[0]
    }

    addCord(cord: Cord) {
        this.cords.push(cord)
    }
}