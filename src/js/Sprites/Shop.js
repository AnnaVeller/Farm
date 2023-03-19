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
    this.game.input.topOnly = false

    this.chosenField = '' // выбранное поле

    this.game.input.on('dragstart', this.dragStart, this)
    this.game.input.on('drag', this.dragMove, this)
    this.game.input.on('dragend', this.dragEnd, this)

    this.container = this.game.add.container(this.config.x, this.config.y)
    this.container.add([
      shop.content,
      wheatStable.content, cowStable.content, chickenStable.content,
      wheat.content, cow.content, chicken.content
    ])
  }

  dragStart(pointer, gameObject) {
    gameObject.setTint(0x00ff99)
    this.startFindField()
  }

  dragMove(pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX
    gameObject.y = dragY
  }

  dragEnd(pointer, gameObject) {
    gameObject.x = gameObject.parentClass.config.x
    gameObject.y = gameObject.parentClass.config.y
    gameObject.clearTint()

    this.stopFindField()

    if (this.chosenField && this.chosenField.parentContainer) {
      this.chosenField.parentContainer.parentClass.showObject(gameObject.parentClass.name)
      this.chosenField = ''
    }
  }

  // ищем свободные клетки над полем
  startFindField() {
    this.game.input.on('gameobjectover', (pointer, gameObject) => {
      if (gameObject.texture.key !== 'field') return
      gameObject.setTint(0x00ff00)
      this.chosenField = gameObject
    })

    this.game.input.on('gameobjectout', (pointer, gameObject) => {
      if (gameObject.texture.key !== 'field') return
      if (this.chosenField === gameObject) {
        this.chosenField = ''
      }

      gameObject.clearTint()
    })
  }

  stopFindField() {
    this.game.input.removeAllListeners('gameobjectover')
    this.game.input.removeAllListeners('gameobjectout')
  }

  getObject(config) {
    return Object.assign({x: 0, y: 0}, config)
  }
}
