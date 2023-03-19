import Cell from "./Cell"

const COLS = 8
const ROWS = 8

export default class Field {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)

    this.container = this.game.add.container(this.config.x, this.config.y)
    this.container.add(this.createField())
  }

  createField() {
    const field = []
    const w = 180 / 2 + 5
    const h = 106 / 2 + 5
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const cell = new Cell(this.game, {
          x: (i - j) * w,
          y: (i + j) * h,
        })
        field.push(cell.container)
      }
    }

    return field
  }

  getObject(config) {
    return Object.assign({x: 0, y: 0}, config)
  }
}
