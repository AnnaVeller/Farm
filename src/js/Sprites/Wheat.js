import Sprite from "../Engine/Sprite"
import {EVENTS} from "../config"

const TIME_GROW_WHEAL = 10000 // ms

const STATE = {
  calm: 'calm',
  grow: 'grow'
}

export default class Wheat extends Sprite {
  constructor(game, config) {
    super(game, config)

    this.addGrowUpTween()
  }

  addGrowUpTween() {
    this.timeLeft = TIME_GROW_WHEAL

    this.game.tweens.add({
      targets: this.content,
      scaleX: {from: 0.4, to: 1},
      scaleY: {from: 0.4, to: 1},
      alpha: {from: 0.3, to: 0.8},
      duration: TIME_GROW_WHEAL,
      onStart: () => {
        this.state = STATE.grow
        this.content.tint = 0x808080
      },
      onComplete: () => {
        this.content.clearTint()
        this.content.alpha = 1
        this.content.setScale(1)
        this.content.setInteractive()
        this.content.on('pointerdown', () => this.pickUpWheat())
      },
    })
  }

  pickUpWheat() {
    this.content.alpha = 0
    this.content.removeInteractive()
    this.content.removeAllListeners('pointerdown')

    // эмитим событие, что пшеницу собрали
    this.game.events.emit(EVENTS.addWheat)
    this.addGrowUpTween()
  }

  update(time, delta, timer) {
    if (this.state === STATE.calm) return

    this.timeLeft = this.timeLeft - delta

    if (this.timeLeft < 0) {
      this.timeLeft = 0
      this.state = STATE.calm
      timer.content.alpha = 0
      return
    }

    timer.content.alpha = 1
    timer.changeText((this.timeLeft / 1000).toFixed(0))
  }
}
