import Sprite from "../Engine/Sprite"
import TextSprite from "../Engine/TextSprite"

export default class Counters {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)

    const wheatIcon = new Sprite(this.game, {
      x: 0, y: 0,
      scale: {x: 0.8, y: 0.8},
      key: 'wheat',
    })

    const wheatCount = new TextSprite(this.game, {
      x: 50, y: 0,
      text: 0,
      textStyle: {font: '50px Arial', fill: '#5c3b3b'},
    })

    const eggIcon = new Sprite(this.game, {
      x: 0, y: 70,
      key: 'egg',
    })

    const eggCount = new TextSprite(this.game, {
      x: 50, y: 70,
      text: 0,
      textStyle: {font: '50px Arial', fill: '#5c3b3b'},
    })

    const milkIcon = new Sprite(this.game, {
      x: 0, y: 140,
      scale: {x: 0.8, y: 0.8},
      key: 'milk',
    })

    const milkCount = new TextSprite(this.game, {
      x: 50, y: 140,
      text: 0,
      textStyle: {font: '50px Arial', fill: '#5c3b3b'},
    })

    const coinIcon = new Sprite(this.game, {
      x: 0, y: 210,
      scale: {x: 0.8, y: 0.8},
      key: 'coin',
    })

    const coinCount = new TextSprite(this.game, {
      x: 50, y: 210,
      text: 0,
      textStyle: {font: '50px Arial', fill: '#5c3b3b'},
    })

    this.container = this.game.add.container(100, 300)
    this.container.add([
      wheatIcon.content, wheatCount.content,
      eggIcon.content, eggCount.content,
      milkIcon.content, milkCount.content,
      coinIcon.content, coinCount.content,
    ])
  }


  getObject(config) {
    return Object.assign({}, config)
  }
}
