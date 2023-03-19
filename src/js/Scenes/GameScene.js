import Phaser from "phaser"
import {getWorldView, resize} from "../Engine/resizer"
import Sprite from "../Engine/Sprite"
import Field from "../Sprites/Field"
import Shop from "../Sprites/Shop"
import Counters from "../Sprites/Counters"
import {EVENTS} from "../config"
import DragNDrop from "../Sprites/DragNDrop"

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

    const dragNDrop = new DragNDrop(this, {})

    this.events.on(EVENTS.pickupWheat, counters.addWheat, counters)
    this.events.on(EVENTS.addEgg, counters.addEgg, counters)
    this.events.on(EVENTS.addMilk, counters.addMilk, counters)
    this.events.on(EVENTS.eatWheat, counters.minusWheat, counters)

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  update(time, delta) {
    this.containers.field.update(time, delta)
  }

  resize() {
    // сцена продолжает работать, даже если мы ушли отсюда
    if (!this.scene.settings.active) return

    resize(this)

    // левый вверх экрана
    const worldView = getWorldView(this.cameras.main)

    // правый низ экрана
    const bottomScreen = {
      x: worldView.x + this.cameras.main.displayWidth,
      y: worldView.y + this.cameras.main.displayHeight
    }

    this.containers.shop.setPosition(bottomScreen.x - 300, worldView.y + 100)
    this.containers.counters.setPosition(worldView.x + 80, worldView.y + 100)
  }

}
