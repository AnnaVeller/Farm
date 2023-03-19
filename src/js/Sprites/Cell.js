import Sprite from "../Engine/Sprite"
import {EVENTS} from "../config"

export default class Cell {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)

    this.container = this.game.add.container(this.config.x, this.config.y)
    this.container.parentClass = this

    this.field = new Sprite(this.game, {
      x: 0, y: 0,
      key: 'field',
    })

    this.field.content.setInteractive({pixelPerfect: true})

    this.cow = new Sprite(this.game, {
      x: 5, y: -20,
      key: 'cow',
      alpha: 0,
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
    })

    this.container.add([this.field.content, this.wheat.content, this.cow.content, this.chicken.content])
  }

  showObject(name = '') {
    this.field.content.clearTint()
    this.field.content.removeInteractive()

    switch (name) {
      case 'cow':
        this.showCow()
        break
      case 'wheat':
        this.showWheat()
        break
      case 'chicken':
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
    this.game.tweens.add({
      targets: this.wheat.content,
      scaleX: {from: 0.4, to: 1},
      scaleY: {from: 0.4, to: 1},
      alpha: {from: 0.3, to: 0.8},
      duration: 1000,
      onStart: () => {
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

  getObject(config) {
    return Object.assign({x: 0, y: 0}, config)
  }
}
