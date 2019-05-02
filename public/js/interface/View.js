import { directions, randomElement } from "./RandomMove";
import { charFromElement } from "./World";

class View {
  constructor(world, vector) {
    this.world = world;
    this.vector = vector;
  }

  // look - вычисляем координаты на которые мы пытаемся посмотреть,
  // и получаем соответсвующий символ элемента находящийся там.
  // Если смотрим снаружу сетки, то возвращаем стену,
  // т.к. без окружающих стен существа не смогут сойти с края.

  look(dir) {
    let target = this.vector.plus(directions[dir]);
    return this.world.grid.isInside(target) ? charFromElement(this.world.grid.get(target)) : "#";
  }

  findAll(ch) {
    let found = [];
    for (let dir in directions) if (this.look(dir) === ch) found.push(dir);
    return found;
  }

  find(ch) {
    var found = this.findAll(ch);
    if (found.length === 0) return null;
    return randomElement(found);
  }
}

export default View;
