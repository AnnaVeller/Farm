import Sprite from "../Engine/Sprite"
import {EVENTS} from "../config"

const TIME_EAT_WHEAL = 20000 // ms
const TIME_GAVE_MILK = 20000 // ms

const STATE = {
  calm: 'calm',
  eat: 'eat'
}

export default class Cow extends Sprite {
  constructor(game, config) {
    super(game, config)

    this.addPointerDownEvent()

    this.timeLeft = 0
    this.state = STATE.calm
  }

  addPointerDownEvent() {
    this.content.on('pointerdown', () => {
      if (this.state === STATE.eat) return
      if (this.game.resource.wheat <= 0) return

      this.state = STATE.eat
      this.timeLeft = TIME_EAT_WHEAL // sec

      this.game.events.emit(EVENTS.eatWheat)

      this.game.tweens.add({
        targets: this.content,
        scaleX: {from: 1, to: 0.95},
        scaleY: {from: 1, to: 0.95},
        duration: 100,
        yoyo: true,
      })

      this.eatTween = this.game.tweens.add({
        targets: this.content,
        scaleX: {from: 1, to: 1.05},
        scaleY: {from: 1, to: 1.1},
        delay: 200,
        duration: 400,
        yoyo: true,
        repeat: -1
      })
    })
  }

  update(time, delta, timer) {
    if (this.state === STATE.calm) return

    this.timeLeft = this.timeLeft - delta

    if (this.timeLeft < 0) {
      this.timeLeft = 0
      this.game.events.emit(EVENTS.addMilk)
      this.state = STATE.calm
      this.eatTween && this.eatTween.stop()
      timer.content.alpha = 0
      return
    }

    timer.content.alpha = 1
    timer.changeText((this.timeLeft / 1000).toFixed(0))
  }
}
