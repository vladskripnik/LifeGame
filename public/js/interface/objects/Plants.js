/* 
  Трава начинает со случайного уровня энергии от 2 до 7, чтобы она не
  размножалась в один ход. Когда растение достигает энергии 15, а рядом
  есть пустая клетка – она размножается в неё. Если она не может
  размножится, то просто растёт, пока не достигнет энергии 20.
*/

class Plants {
  constructor() {
    this.energy = 2 + Math.floor(Math.random() * 5);
  }

  act(context) {
    if (this.energy > 15) {
      var space = context.find(" ");
      if (space) return { type: "reproduce", direction: space };
    }
    if (this.energy < 20) return { type: "grow" };
  }
}

export default Grass;
