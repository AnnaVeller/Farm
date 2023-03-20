import Animal from "./Animal"
import {EVENTS} from "../config"

const TIME_EAT_WHEAL = 30000 // ms
const TIME_GAVE_EGG = 10000 // ms

export default class Chicken extends Animal {
  constructor(game, config) {
    super(game, config)

    this.times = {
      eat: TIME_EAT_WHEAL,
      gaveResource: TIME_GAVE_EGG
    }

    this.timeEndFunc = () => {
      this.game.events.emit(EVENTS.addEgg)
    }
  }
}
