import Sprite from "../Engine/Sprite"
import {EVENTS} from "../config"

const STATE = {
  calm: 'calm',
  eat: 'eat'
}

export default class Animal extends Sprite {
  constructor(game, config) {
    super(game, config)

    this.addPointerDownEvent()

    this.timeLeft = 0
    this.state = STATE.calm
    this.iResource = 1 // порядковый номер выпадения ресурса (напр. для курицы 1,2,3)
  }

  addPointerDownEvent() {
    this.content.on('pointerdown', () => {
      if (this.state === STATE.eat) return
      if (this.game.resource.wheat <= 0) return

      this.state = STATE.eat
      this.timeLeft = this.times.eat

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

      this.timeEndFunc && this.timeEndFunc()
      this.state = STATE.calm
      this.eatTween && this.eatTween.stop()
      timer.content.alpha = 0
      this.iResource = 1
      return
    }

    if (this.timeLeft < this.times.eat - this.times.gaveResource * this.iResource) {
      this.iResource += 1
      this.timeEndFunc && this.timeEndFunc()
    }

    timer.content.alpha = 1
    timer.changeText((this.timeLeft / 1000).toFixed(0))
  }

  getObject(config) {
    return Object.assign({
      alpha: 1,
      x: 0, y: 0,
      scale: {x: 1, y: 1},
      origin: {x: 0.5, y: 0.5},
      interactive: false,
      name: '',
    }, config)
  }
}
