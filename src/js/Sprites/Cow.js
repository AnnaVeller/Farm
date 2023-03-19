import Sprite from "../Engine/Sprite"
import {EVENTS} from "../config"

export default class Cow extends Sprite {
  constructor(game, config) {
    super(game, config)

    this.timeLeft = 20000 // 20sec

    this.content.on('pointerdown', () => {
      this.game.events.emit(EVENTS.eatWheat)

      this.game.tweens.add({
        targets: this.content,
        scaleX: {from: 1, to: 0.95},
        scaleY: {from: 1, to: 0.95},
        duration: 100,
        yoyo: true,
      })

      const eatTween = this.game.tweens.add({
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


  getEatTime(){
    return 20
  }
}
