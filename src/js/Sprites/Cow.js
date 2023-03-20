import Animal from "./Animal"
import {EVENTS} from "../config"

const TIME_EAT_WHEAL = 20000 // ms
const TIME_GAVE_MILK = 20000 // ms

export default class Cow extends Animal {
  constructor(game, config) {
    super(game, config)

    this.times = {
      eat: TIME_EAT_WHEAL,
      gaveResource: TIME_GAVE_MILK
    }

    this.timeEndFunc = () => {
      this.game.events.emit(EVENTS.addMilk)
    }
  }
}
