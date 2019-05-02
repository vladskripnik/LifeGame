import React, { Component } from 'react';
import World from "../interface/World";
import Wall from "../../interface/objects/Wall";
import Herbivore from "../../interface/objects/Herbivore";
import Grass from "../../interface/objects/Grass";


class ViewWorld extends Component {
    constructor(){
    this.states = {
    world: [],
    worldObj: {},
    titleStartBtn: "Start",
    infoWorld: {},
  };

  componentDidMount() 
    this.createWorld();
}
};
  createWorld = () => {
    let world = new World(this.props.sizeWorld, { "#": Wall, o: PlansEater, "*": Plant });
    this.setState({ worldObj: world, world: world.getMapInfo().output, infoWorld: world.getMapInfo().countOfEntities });
  };

  restartWorld = () => {
    clearInterval(this.states.timerId);
    this.createWorld();
    this.setState({ titleStartBtn: "Start" });
  };

  startStopBtn = () => {
    if (this.states.titleStartBtn === "Pause") {
      clearInterval(this.states.timerId);
      this.setState({ titleStartBtn: "Continue" });
    } else {
      let timerId = setInterval(() => {
        this.states.worldObj.turn();
        this.setState({
          world: this.states.worldObj.getMapInfo().output,
          infoWorld: this.states.worldObj.getMapInfo().countOfEntities,
        });
      }, this.props.turnDelay);
      this.setState({ timerId: timerId, titleStartBtn: "Pause" });
    }
  };

  nextStep = () => {
    this.states.worldObj.turn();
    this.setState({
      world: this.states.worldObj.getMapInfo().output,
      infoWorld: this.states.worldObj.getMapInfo().countOfEntities,
    });
  };

  render() {
    const { world, titleStartBtn, infoWorld } = this.states;
    const { toggleShowViewWorld } = this.props;
    return (
      <div className="viewWorld">
        <div className="wrapperButtons">
          <button id="btnStart-Pause" type="button" className="btn btn-success" onClick={this.startStopBtn}>
            {titleStartBtn}
          </button>
          <button id="btnRestart" type="button" className="btn btn-danger" onClick={this.restartWorld}>
            Restart
          </button>
        </div>
        <div className="wrapperInfoWorld">
          <div className="columnInfoWorld">
            <div className="infoCount">{`Plans (*): ${infoWorld["*"]}`}</div>
            <div className="infoCount">{`PlansEater (o): ${infoWorld["o"]}`}</div>
          </div>
          <div className="columnInfoWorld">
            <div className="infoCount">{`Walls (#): ${infoWorld["#"]}`}</div>
          </div>
        </div>
        <div id="world">
          {world.map((string, i) => {
            return (
              <div className="string" key={i}>
                {string}
              </div>
            );
          })}
        </div>
      </div>
    );
}
export default ViewWorld;
