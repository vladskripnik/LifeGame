class PlanEater {
  constructor() {
    this.energy = 20;
  }

  act(context) {
    let space = context.find(" ");
    if (this.energy > 60 && space) return { type: "reproduce", direction: space };
    let grass = context.find("*");
    if (grass) return { type: "eat", direction: grass };
    if (space) return { type: "move", direction: space };
  }
}

export default Herbivore;