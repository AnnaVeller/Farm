import {EVENTS} from "../config"

export default class DragNDrop {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)

    this.chosenField = '' // выбранное поле

    this.game.input.topOnly = false

    this.game.input.on('dragstart', this.dragStart, this)
    this.game.input.on('drag', this.dragMove, this)
    this.game.input.on('dragend', this.dragEnd, this)
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
    return Object.assign({}, config)
  }
}
