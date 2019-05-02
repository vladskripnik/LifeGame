import { elementFromChar } from "./World";

export const actionTypes = Object.create(null);

// Рост всегда успешен и добавляет половину единицы к энергетическому
// уровню растения.

actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};

/*
    1. Предоставляет ли действие допустимое направление (checkDestination)
    2. Если не предоставляет, или в том направлении не пустой участок или у 
        существа не хватает энергии - move возвращает false, т.о. показывая что действие не состоялось. 
    3. Если все ок, двигаем существо.
*/

actionTypes.move = function(critter, vector, action) {
  let dest = this.checkDestination(action, vector);
  if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null) return false;
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

// при поедании существом другого существа либо травы, соседняя клетка должна содержать энергию
// если действие подтверждается (true), тогда энергия съеденного переходит к едоку, а жертва удаляется из сетки.

actionTypes.eat = function(critter, vector, action) {
  let dest = this.checkDestination(action, vector);
  let atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null) return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

// размножение отнимает в 2 раза больше энергии чем есть у новорожденного.
// переменная baby - гипотетический отпрыск, с помощью которого проверяем хватает ли у его родителя энергии для его рождения
// энергия гипотетического ребенка = нач. значению энергии при создании существа
// энергия родителя должна быть в 2 раза больше его начальной (стартовой) энергии.
// если её хватает, то ребенок перемещается на соседнюю клетку.
//
actionTypes.reproduce = function(critter, vector, action) {
  let baby = elementFromChar(this.legend, critter.originChar);
  let dest = this.checkDestination(action, vector);
  if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null) return false;
  critter.energy /= 2;
  baby.energy = critter.energy;
  this.grid.set(dest, baby);
  return true;
};
