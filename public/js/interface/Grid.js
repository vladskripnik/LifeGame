import Vector from "./Vector";

class Grid {
  constructor(width, height) {
    this.space = new Array(width * height); // одномерный массив (пространство)
    this.width = width;
    this.height = height;
  }

  // проверка на то входит ли в границы массива запрашиваемое значение
  isInside(vector) {
    return vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height;
  }

  get(vector) {
    return this.space[vector.x + this.width * vector.y];
  }

  set(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
  }

  // вызов функции для каждого элемента сетки

  forEach(f, context) {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var value = this.space[x + y * this.width];
        if (value != null) f.call(context, value, new Vector(x, y));
      }
    }
  }
}

export default Grid;
