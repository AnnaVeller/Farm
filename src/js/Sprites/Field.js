import Cell from "./Cell"
import Sprite from "../Engine/Sprite"

const COLS = 8
const ROWS = 8
const FIELD_SIZE = {
  w: 180, h: 106
}

export default class Field {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)

    this.container = this.game.add.container(this.config.x, this.config.y)

    const [glows, fields] = this.createField()
    this.container.add(glows)
    this.container.add(fields)

    this.fields = fields
  }

  createField() {
    const fields = []
    const glows = []
    const w = FIELD_SIZE.w / 2 + 5
    const h = FIELD_SIZE.h / 2 + 5
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const glow = new Sprite(this.game, {
          x: (i - j) * w,
          y: (i + j) * h,
          key: 'glow'
        })
        const cell = new Cell(this.game, {
          x: (i - j) * w,
          y: (i + j) * h,
        })
        glows.push(glow.content)
        fields.push(cell.container)
      }
    }

    return [glows, fields]
  }

  update(time, delta) {
    this.fields.forEach(el => el.parentClass.update(time, delta))
  }

  getObject(config) {
    return Object.assign({x: 0, y: 0}, config)
  }
}
