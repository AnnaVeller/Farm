import Sprite from "../Engine/Sprite"
import TextSprite from "../Engine/TextSprite"

export default class Counters {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)

    this.wheatCount = 0
    this.eggCount = 0
    this.milkCount = 0

    const wheatIcon = new Sprite(this.game, {
      x: 0, y: 0,
      scale: {x: 0.8, y: 0.8},
      key: 'wheat',
      interactive: true
    })

    this.game.input.setDraggable(wheatIcon.content)

    this.wheatCountText = new TextSprite(this.game, {
      x: 60, y: 0,
      text: 0,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    const eggIcon = new Sprite(this.game, {
      x: 0, y: 70,
      key: 'egg',
    })

    this.eggCountText = new TextSprite(this.game, {
      x: 60, y: 70,
      text: 0,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    const eggSellBtn = new Sprite(this.game, {
      x: 160, y: 65,
      key: 'sellBtn',
      tint: 0x808080
    })

    const milkIcon = new Sprite(this.game, {
      x: 0, y: 140,
      scale: {x: 0.8, y: 0.8},
      key: 'milk',
    })

    this.milkCountText = new TextSprite(this.game, {
      x: 60, y: 140,
      text: 0,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    const milkSellBtn = new Sprite(this.game, {
      x: 160, y: 135,
      key: 'sellBtn',
      tint: 0x808080
    })

    const coinIcon = new Sprite(this.game, {
      x: 0, y: 210,
      scale: {x: 0.8, y: 0.8},
      key: 'coin',
    })

    const coinCount = new TextSprite(this.game, {
      x: 60, y: 210,
      text: 0,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    this.container = this.game.add.container(100, 300)
    this.container.add([
      wheatIcon.content, this.wheatCountText.content,
      eggIcon.content, this.eggCountText.content, eggSellBtn.content,
      milkIcon.content, this.milkCountText.content, milkSellBtn.content,
      coinIcon.content, coinCount.content,
    ])
  }

  addWheat() {
    this.wheatCountText.changeText(++this.wheatCount)
  }

  addMilk() {
    this.milkCountText.changeText(++this.milkCount)
  }

  addEgg() {
    this.eggCountText.changeText(++this.eggCount)
  }

  getObject(config) {
    return Object.assign({}, config)
  }
}
