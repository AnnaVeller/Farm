import Phaser from "phaser"
import {resize} from "../Engine/resizer"
import Sprite from "../Engine/Sprite"
import Field from "../Sprites/Field"
import Shop from "../Sprites/Shop"
import Counters from "../Sprites/Counters"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  init() {
    this.sprites = {}
    this.containers = {}
  }

  create() {
    this.sprites.background = new Sprite(this, {
      x: 700, y: 700,
      key: 'background',
    })

    this.containers.field = new Field(this, {x: 700, y: 400})

    // создание счетчиков пшеницы, яиц, молока и монеток
    const counters = new Counters(this, {x: 400, y: 300})
    this.containers.counters = counters.container

    // создание магазина откуда брать сущности (пшеницу, курицу, корову)
    const shop = new Shop(this, {x: 400, y: 300})
    this.containers.shop = shop.container

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  update(time, delta) {
  }

  resize() {
    // сцена продолжает работать, даже если мы ушли отсюда
    if (!this.scene.settings.active) return

    resize(this)
  }

}


