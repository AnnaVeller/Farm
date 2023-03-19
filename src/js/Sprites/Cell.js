import Sprite from "../Engine/Sprite"

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

    // switch (name) {
    //   case 'cow':
    //     this.showCow()
    //     break
    //   case 'wheat':
    //     this.showWheat()
    //     break
    //   case 'chicken':
    //     this.showChicken()
    //     break
    // }

    this.field.content.removeInteractive()
    this[name].content.alpha = 1

  }

  // showCow() {
  //   this.field.content.removeInteractive()
  //   this.cow.content.alpha = 1
  // }
  //
  // showWheat() {
  //   this.field.content.removeInteractive()
  //   this.wheat.content.alpha = 1
  // }
  //
  // showChicken() {
  //   this.field.content.removeInteractive()
  //   this.chicken.content.alpha = 1
  // }

  getObject(config) {
    return Object.assign({x: 0, y: 0}, config)
  }
}
