import Sprite from "../Engine/Sprite"
import {EVENTS} from "../config"
import Cow from "./Cow"
import TextSprite from "../Engine/TextSprite"

export default class Cell {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)

    this.whom = ''
    this.state = 'calm'

    this.timeLeft = 20000

    this.container = this.game.add.container(this.config.x, this.config.y)
    this.container.parentClass = this

    this.field = new Sprite(this.game, {
      x: 0, y: 0,
      key: 'field',
    })

    this.field.content.setInteractive({pixelPerfect: true})

    this.timer = new TextSprite(this.game, {
      x: 0, y: -50,
      alpha: 0,
      text: 0,
      textStyle: {font: '30px Monospace', fill: '#033408'},
    })

    this.cow = new Sprite(this.game, {
      x: 5, y: -20,
      key: 'cow',
      alpha: 0,
      interactive: true,
    })

    this.cow.content.on('pointerdown', () => {
      if (this.state === 'eat') return

      this.state = 'eat'
      this.timeLeft = 20 // sec

      this.game.events.emit(EVENTS.eatWheat)

      this.game.tweens.add({
        targets: this.cow.content,
        scaleX: {from: 1, to: 0.95},
        scaleY: {from: 1, to: 0.95},
        duration: 100,
        yoyo: true,
      })

      this.eatTween = this.game.tweens.add({
        targets: this.cow.content,
        scaleX: {from: 1, to: 1.05},
        scaleY: {from: 1, to: 1.1},
        delay: 200,
        duration: 400,
        yoyo: true,
        repeat: -1
      })
    })

    this.wheat = new Sprite(this.game, {
      x: 10, y: 0,
      key: 'wheat',
      alpha: 0,
    })

    this.chicken = new Sprite(this.game, {
      x: -10, y: -5,
      key: 'chicken',
      alpha: 0,
      interactive: true
    })

    this.chicken.content.on('pointerdown', () => {
      if (this.state === 'eat') return

      this.state = 'eat'
      this.timeLeft = 30 // sec

      this.game.events.emit(EVENTS.eatWheat)

      this.game.tweens.add({
        targets: this.chicken.content,
        scaleX: {from: 1, to: 0.95},
        scaleY: {from: 1, to: 0.95},
        duration: 100,
        yoyo: true,
      })

      this.eatTween = this.game.tweens.add({
        targets: this.chicken.content,
        scaleX: {from: 1, to: 1.05},
        scaleY: {from: 1, to: 1.1},
        delay: 200,
        duration: 400,
        yoyo: true,
        repeat: -1
      })
    })

    this.container.add([this.field.content, this.wheat.content, this.cow.content,
      this.chicken.content, this.timer.content])
  }

  changeState() {
    if (this.state === 'calm') {
      this.eatTween && this.eatTween.stop()
    }

    if (this.state === 'eat') {

    }
  }

  showObject(name = '') {
    this.field.content.clearTint()
    this.field.content.removeInteractive()
    this.timer.content.alpha = 1

    switch (name) {
      case 'cow':
        this.whom = 'cow'
        this.showCow()
        break
      case 'wheat':
        this.whom = 'wheat'
        this.showWheat()
        break
      case 'chicken':
        this.whom = 'chicken'
        this.showChicken()
        break
    }
  }

  showCow() {
    this.cow.content.alpha = 1
  }

  showWheat() {
    this.addGrowUpTween()
  }

  addGrowUpTween() {
    this.timeLeft = 10 // sec

    this.game.tweens.add({
      targets: this.wheat.content,
      scaleX: {from: 0.4, to: 1},
      scaleY: {from: 0.4, to: 1},
      alpha: {from: 0.3, to: 0.8},
      duration: 10000,
      onStart: () => {
        this.state = 'grow'
        this.wheat.content.tint = 0x808080
      },
      onComplete: () => {
        this.wheat.content.clearTint()
        this.wheat.content.alpha = 1
        this.wheat.content.setScale(1)
        this.wheat.content.setInteractive()
        this.wheat.content.on('pointerdown', () => this.pickUpWheat())
      },
    })
  }

  pickUpWheat() {
    this.wheat.content.alpha = 0
    this.wheat.content.removeInteractive()
    this.wheat.content.removeAllListeners('pointerdown')

    // эмитим событие, что пшеницу собрали
    this.game.events.emit(EVENTS.pickupWheat)
    this.addGrowUpTween()
  }

  showChicken() {
    this.chicken.content.alpha = 1
  }

  update(time, delta) {
    if (this.state === 'calm') return

    this.timeLeft = this.timeLeft - delta / 1000

    if (this.timeLeft < 0) {
      this.timeLeft = 0

      if (this.whom === 'cow') {
        this.game.events.emit(EVENTS.addMilk)
      }

      if (this.whom === 'chicken') {
        this.game.events.emit(EVENTS.addEgg)
        this.game.events.emit(EVENTS.addEgg)
        this.game.events.emit(EVENTS.addEgg)
      }

      this.state = 'calm'

      this.changeState()
      return
    }

    this.timer.changeText(this.timeLeft.toFixed(0))
  }

  getObject(config) {
    return Object.assign({x: 0, y: 0}, config)
  }
}
