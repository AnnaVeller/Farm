import Sprite from "../Engine/Sprite"
import TextSprite from "../Engine/TextSprite"

export default class Counters {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)

    this.wheatCount = 0
    this.eggCount = 0
    this.milkCount = 0
    this.coinCount = 0

    const wheatIcon = new Sprite(this.game, {
      x: 0, y: 0,
      scale: {x: 0.8, y: 0.8},
      key: 'wheat',
      interactive: true
    })

    this.wheatCountText = new TextSprite(this.game, {
      x: 60, y: 0,
      text: this.wheatCount,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    const eggIcon = new Sprite(this.game, {
      x: 0, y: 70,
      key: 'egg',
    })

    this.eggCountText = new TextSprite(this.game, {
      x: 60, y: 70,
      text: this.eggCount,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    this.eggSellBtn = new Sprite(this.game, {
      x: 160, y: 65,
      key: 'sellBtn',
      tint: this.eggCount > 0 ? null : 0x808080,
      interactive: true,
    })

    const milkIcon = new Sprite(this.game, {
      x: 0, y: 140,
      scale: {x: 0.8, y: 0.8},
      key: 'milk',
    })

    this.milkCountText = new TextSprite(this.game, {
      x: 60, y: 140,
      text: this.milkCount,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    this.milkSellBtn = new Sprite(this.game, {
      x: 160, y: 135,
      key: 'sellBtn',
      tint: this.milkCount > 0 ? null : 0x808080,
      interactive: true
    })

    const coinIcon = new Sprite(this.game, {
      x: 0, y: 210,
      scale: {x: 0.8, y: 0.8},
      key: 'coin',
    })

    this.coinCountText = new TextSprite(this.game, {
      x: 60, y: 210,
      text: this.coinCount,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    this.container = this.game.add.container(100, 300)
    this.container.add([
      wheatIcon.content, this.wheatCountText.content,
      eggIcon.content, this.eggCountText.content, this.eggSellBtn.content,
      milkIcon.content, this.milkCountText.content, this.milkSellBtn.content,
      coinIcon.content, this.coinCountText.content,
    ])

    this.addBtnHandlerMilk()
    this.addBtnHandlerEgg()
  }

  addBtnHandlerMilk() {
    this.milkSellBtn.content.on('pointerdown', () => {
      if (this.milkCount > 0) {
        this.minusMilk()
        this.addCoin(5)
      }
    })
  }

  addBtnHandlerEgg() {
    this.eggSellBtn.content.on('pointerdown', () => {
      if (this.eggCount > 0) {
        this.minusEgg()
        this.addCoin(3)
      }
    })
  }

  minusWheat() {
    this.wheatCountText.changeText(--this.wheatCount)
  }

  minusMilk() {
    this.milkCountText.changeText(--this.milkCount)
    if (this.milkCount === 0) {
      this.milkSellBtn.content.tint = 0x808080
    }
  }

  minusEgg() {
    this.eggCountText.changeText(--this.eggCount)
    if (this.eggCount === 0) {
      this.eggSellBtn.content.tint = 0x808080
    }
  }

  addWheat() {
    this.wheatCountText.changeText(++this.wheatCount)
  }

  addMilk() {
    this.milkCountText.changeText(++this.milkCount)
    this.milkSellBtn.content.clearTint()
  }

  addEgg() {
    this.eggCountText.changeText(++this.eggCount)
    this.eggSellBtn.content.clearTint()
  }

  addCoin(count) {
    this.coinCountText.changeText(this.coinCount += count)
  }

  getObject(config) {
    return Object.assign({}, config)
  }
}
