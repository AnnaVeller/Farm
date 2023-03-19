import Sprite from "../Engine/Sprite"

export default class Shop {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)

    const shop = new Sprite(this.game, {
      x: 100, y: 0,
      key: 'shop',
      alpha: 0.5,
      scale: {x: 1.1, y: 1.1},
      origin: {x: 0.5, y: 0.5}
    })

    const wheatStable = new Sprite(this.game, {
      x: 0, y: 0,
      scale: {x: 0.8, y: 0.8},
      key: 'wheat',
    })

    const wheat = new Sprite(this.game, {
      x: 0, y: 0,
      scale: {x: 0.8, y: 0.8},
      key: 'wheat',
      name: 'wheat',
      interactive: true,
    })

    const cowStable = new Sprite(this.game, {
      x: 100, y: 0,
      scale: {x: 0.75, y: 0.75},
      key: 'cow',
    })

    const cow = new Sprite(this.game, {
      x: 100, y: 0,
      scale: {x: 0.75, y: 0.75},
      key: 'cow',
      name: 'cow',
      interactive: true,
    })

    const chickenStable = new Sprite(this.game, {
      x: 200, y: 0,
      scale: {x: 0.8, y: 0.8},
      key: 'chicken',
    })

    const chicken = new Sprite(this.game, {
      x: 200, y: 0,
      scale: {x: 0.8, y: 0.8},
      key: 'chicken',
      name: 'chicken',
      interactive: true,
    })

    this.game.input.setDraggable(wheat.content)
    this.game.input.setDraggable(cow.content)
    this.game.input.setDraggable(chicken.content)

    this.container = this.game.add.container(this.config.x, this.config.y)
    this.container.add([
      shop.content,
      wheatStable.content, cowStable.content, chickenStable.content,
      wheat.content, cow.content, chicken.content
    ])
  }

  getObject(config) {
    return Object.assign({x: 0, y: 0}, config)
  }
}
