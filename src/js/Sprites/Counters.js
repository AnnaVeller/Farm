import Sprite from "../Engine/Sprite"
import TextSprite from "../Engine/TextSprite"
import {EVENTS} from "../config"
import Button from "../Engine/Button"

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

    this.eggSellBtn = new Button(this.game, {
      x: 160, y: 65,
      key: 'sellBtn',
      interactive: this.game.resource.egg > 0,
      OnPointerdown: () => {
        this.game.events.emit(EVENTS.minusEgg)
        this.game.events.emit(EVENTS.addCoin, EGG_COST)
      }
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

    this.milkSellBtn = new Button(this.game, {
      x: 160, y: 135,
      key: 'sellBtn',
      interactive: this.game.resource.milk > 0,
      OnPointerdown: () => {
        this.game.events.emit(EVENTS.minusMilk)
        this.game.events.emit(EVENTS.addCoin, MILK_COST)
      }
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

  }

  updateMilk(resource) {
    const {milk} = resource
    this.milkCount.changeText(milk)

    this.milkSellBtn.changeInteractive(milk > 0)
  }

  updateEgg(resource) {
    const {egg} = resource
    this.eggCount.changeText(egg)

    this.eggSellBtn.changeInteractive(egg > 0)
  }

  updateWheat(resource) {
    const {wheat} = resource
    this.wheatCount.changeText(wheat)
  }

  updateCoin(resource) {
    const {coin} = resource
    this.coinCount.changeText(coin)
  }

  getObject(config) {
    return Object.assign({}, config)
  }
}
