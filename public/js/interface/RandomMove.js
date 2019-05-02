import Vector from "./Vector";

class RandomMove {
  constructor() {
    this.direction = randomElement(Object.keys(directions));
  }
}

export function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export const directions = {
  // возможные направления движения/поля зрения существа(по 1 клетке)
  n: new Vector(0, -1),
  ne: new Vector(1, -1),
  e: new Vector(1, 0),
  se: new Vector(1, 1),
  s: new Vector(0, 1),
  sw: new Vector(-1, 1),
  w: new Vector(-1, 0),
  nw: new Vector(-1, -1),
};

export default RandomMove;