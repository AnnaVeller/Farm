import Sprite from "../Engine/Sprite"
import TextSprite from "../Engine/TextSprite"
import {EVENTS} from "../config"

const EGG_COST = 3
const MILK_COST = 5

export default class Counters {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)

    const wheatIcon = new Sprite(this.game, {
      x: 0, y: 0,
      scale: {x: 0.8, y: 0.8},
      key: 'wheat',
      interactive: true
    })

    this.wheatCount = new TextSprite(this.game, {
      x: 60, y: 0,
      text: this.game.resource.wheat,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    const eggIcon = new Sprite(this.game, {
      x: 0, y: 70,
      key: 'egg',
    })

    this.eggCount = new TextSprite(this.game, {
      x: 60, y: 70,
      text: this.game.resource.egg,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    this.eggSellBtn = new Sprite(this.game, {
      x: 160, y: 65,
      key: 'sellBtn',
      tint: this.game.resource.egg > 0 ? null : 0x808080,
      interactive: this.game.resource.egg > 0,
    })

    const milkIcon = new Sprite(this.game, {
      x: 0, y: 140,
      scale: {x: 0.8, y: 0.8},
      key: 'milk',
    })

    this.milkCount = new TextSprite(this.game, {
      x: 60, y: 140,
      text: this.game.resource.milk,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    this.milkSellBtn = new Sprite(this.game, {
      x: 160, y: 135,
      key: 'sellBtn',
      tint: this.game.resource.milk > 0 ? null : 0x808080,
      interactive: this.game.resource.milk > 0,
    })

    const coinIcon = new Sprite(this.game, {
      x: 0, y: 210,
      scale: {x: 0.8, y: 0.8},
      key: 'coin',
    })

    this.coinCount = new TextSprite(this.game, {
      x: 60, y: 210,
      text: this.game.resource.coin,
      textStyle: {font: '50px Monospace', fill: '#5c3b3b'},
    })

    this.container = this.game.add.container(100, 300)
    this.container.add([
      wheatIcon.content, this.wheatCount.content,
      eggIcon.content, this.eggCount.content, this.eggSellBtn.content,
      milkIcon.content, this.milkCount.content, this.milkSellBtn.content,
      coinIcon.content, this.coinCount.content,
    ])

    this.addBtnHandlerMilk()
    this.addBtnHandlerEgg()
  }

  updateMilk(resource) {
    const {milk} = resource
    this.milkCount.changeText(milk)

    if (milk > 0) {
      this.milkSellBtn.content.clearTint()
      this.milkSellBtn.content.setInteractive()
    } else {
      this.milkSellBtn.content.tint = 0x808080
      this.milkSellBtn.content.removeInteractive()
    }
  }

  updateEgg(resource) {
    const {egg} = resource
    this.eggCount.changeText(egg)

    if (egg > 0) {
      this.eggSellBtn.content.clearTint()
      this.eggSellBtn.content.setInteractive()
    } else {
      this.eggSellBtn.content.tint = 0x808080
      this.eggSellBtn.content.removeInteractive()
    }
  }

  updateWheat(resource) {
    const {wheat} = resource
    this.wheatCount.changeText(wheat)
  }

  updateCoin(resource) {
    const {coin} = resource
    this.coinCount.changeText(coin)
  }

  addBtnHandlerMilk() {
    this.milkSellBtn.content.on('pointerdown', () => {
      this.game.events.emit(EVENTS.minusMilk)
      this.game.events.emit(EVENTS.addCoin, MILK_COST)
    })
  }

  addBtnHandlerEgg() {
    this.eggSellBtn.content.on('pointerdown', () => {
      this.game.events.emit(EVENTS.minusEgg)
      this.game.events.emit(EVENTS.addCoin, EGG_COST)
    })
  }

  getObject(config) {
    return Object.assign({}, config)
  }
}
