import Sprite from "../Engine/Sprite"
import Cow from "./Cow"
import TextSprite from "../Engine/TextSprite"
import Chicken from "./Chicken"
import Wheat from "./Wheat"

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

    this.timer = new TextSprite(this.game, {
      x: 0, y: -50,
      text: 0,
      alpha: 0,
      textStyle: {font: '30px Monospace', fill: '#033408'},
    })

    this.container.add([this.field.content, this.timer.content])
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
    this.actor = new Cow(this.game, {
      x: 5, y: -20,
      key: 'cow',
      interactive: true,
    })
    this.container.addAt(this.actor.content, 1)
  }

  showWheat() {
    this.actor = new Wheat(this.game, {
      x: 10, y: 0,
      key: 'wheat',
      interactive: true,
    })
    this.container.addAt(this.actor.content, 1)
  }

  showChicken() {
    this.actor = new Chicken(this.game, {
      x: -10, y: -5,
      key: 'chicken',
      interactive: true,
    })
    this.container.addAt(this.actor.content, 1)
  }

  update(time, delta) {
    if (this.actor) {
      this.actor.update(time, delta, this.timer)
    }
  }

  getObject(config) {
    return Object.assign({x: 0, y: 0}, config)
  }
}
