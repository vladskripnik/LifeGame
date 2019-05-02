import Grid from "./Grid";
import Vector from "./Vector";
import { actionTypes } from "./actionTypes";
import { directions } from "./RandomMove";
import View from "./View";

class World {
  constructor(map, legend) {
    let grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;
    map.forEach((line, y) => {
      for (let x = 0; x < line.length; x++) grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
    });
  }

  toString() {
    var output = "";
  for (var y = 0; y < this.grid.height; y++) {
  for (var x = 0; x < this.grid.width; x++) {
   var element = this.grid.get(new Vector(x, y));
    output += charFromElement(element);
    }
      output += "\n";
    }
      return output;
};
  }

  /* 
    turn - метод шага, даёт существам возможность действовать
    обходит методом forEach (определенным выше) сетку и ищет объекты у которых есть метод act, 
    который он и вызывает c параметром объектом action, 
    который производит действие если оно допустимо (для тех у кого оно есть).
    Чтобы предостварить случай того что существа могут перейти на клетку которая еще 
    не обыла обработана во время вызова функции forEach необходимо хранить массив объектов (acted) существ которые уже сделали свой шаг, 
    и игнорировать их при повторном проходе, тем самым запретить одному 
    существу осущетвлять 2 действия за один вызов метода turn()
*/

  turn() {
    var acted = [];
    this.grid.forEach((critter, vector) => {
      if (critter.act && acted.indexOf(critter) === -1) {
        acted.push(critter);
        this.letAct(critter, vector);
      }
    }, this); // для правильного доступа к this в функции (в контексте World)
  }

  // letAct - вызывает функции по совершению действий передавая в них параметры,

  letAct(critter, vector) {
    let action = critter.act(new View(this, vector));
    let handled = action && action.type in actionTypes && actionTypes[action.type].call(this, critter, vector, action);
    if (!handled) {
      critter.energy -= 0.2;
      if (critter.energy <= 0) this.grid.set(vector, null);
    }
  }

  checkDestination(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
      var dest = vector.plus(directions[action.direction]);
      if (this.grid.isInside(dest)) return dest;
    }
  }

export function elementFromChar(legend, ch) {
  if (ch == " ")
  return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

export function charFromElement(element) {
  if (element == null)
  return " ";
  else
  return element.originChar;
}

export default World;
