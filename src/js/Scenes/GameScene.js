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

    this.resource = {
      wheat: 5,
      milk: 1,
      egg: 0,
      coin: 0
    }

  }

  init() {
    this.sprites = {}
    this.containers = {}
  }

  create() {
    this.sprites.background = new Sprite(this, {
      origin: {x: 0, y: 0},
      key: 'background',
    })

    this.containers.field = new Field(this, {x: 850, y: 440})

    // создание счетчиков пшеницы, яиц, молока и монеток
    const counters = new Counters(this, {x: 400, y: 300})
    this.containers.counters = counters.container

    // создание магазина откуда брать сущности (пшеницу, курицу, корову)
    const shop = new Shop(this, {x: 400, y: 300})
    this.containers.shop = shop.container

    const dragNDrop = new DragNDrop(this, {})

    this.events.on(EVENTS.addWheat, () => {
      this.resource.wheat += 1
      counters.updateWheat(this.resource)
    })
    this.events.on(EVENTS.addEgg, () => {
      this.resource.egg += 1
      counters.updateEgg(this.resource)
    })
    this.events.on(EVENTS.addMilk, () => {
      this.resource.milk += 1
      counters.updateMilk(this.resource)
    })
    this.events.on(EVENTS.addCoin, (count) => {
      this.resource.coin += count
      counters.updateCoin(this.resource)
    })

    this.events.on(EVENTS.eatWheat, () => {
      this.resource.wheat -= 1
      counters.updateWheat(this.resource)
    })
    this.events.on(EVENTS.minusMilk, () => {
      this.resource.milk -= 1
      counters.updateMilk(this.resource)
    })
    this.events.on(EVENTS.minusEgg, () => {
      this.resource.egg -= 1
      counters.updateEgg(this.resource)
    })

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
