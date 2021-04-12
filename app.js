const prompt = require('prompt-sync')({ sigint: true })
// require('prompt-sync')({sigint: true});

const player = '*'
const hole = 'O'
const hat = '^'
const background = '░'

class Field {
  constructor(field = [[]]) {
    this.field = field
    this.positionX = 0
    this.positionY = 0
  }

  static generateField(height = 2, width = 2, holePercent = 0.2) {
    const field = []
    for (let i = 0; i <= height; i++) {
      const row = []
      let char = ''
      for (let j = 0; j <= width; j++) {
        const random = Math.random()
        char = random > holePercent ? background : hole
        row.push(char)
      }
      field.push(row)
    }
    field[0][0] = player
    const posHatY = Math.floor(Math.random() * height + 2)
    const posHatX = Math.floor(Math.random() * width + 2)
    field[posHatY][posHatX] = hat
    return field
  }

  runGame() {
    let playing = true
    while (playing) {
      this.print()
      let oldPosX = this.positionX
      let oldPosY = this.positionY
      this.askQuestion()
      if (!this.checkCondition()) playing = false
      this.field[this.positionY][this.positionX] = player
      this.field[oldPosY][oldPosX] = background
    }
  }

  askQuestion() {
    const answer = prompt('Which way? ').toUpperCase()
    switch (answer) {
      case 'D':
        this.positionX++
        break
      case 'S':
        this.positionY++
        break
      case 'A':
        this.positionX--
        break
      case 'W':
        this.positionY--
        break
      default:
        console.log('Enter W, A, S or D')
        this.askQuestion()
        break
    }
  }

  print() {
    const fieldString = this.field.map((row) => row.join('')).join('\n')
    console.log(fieldString)
  }

  isInBounds() {
    return (
      this.positionX >= 0 &&
      this.positionY >= 0 &&
      this.positionY < this.field.length &&
      this.positionX < this.field[0].length
    )
  }

  checkCondition() {
    const position = this.field[this.positionY][this.positionX]
    if (!this.isInBounds()) {
      console.log('Out of bounds, you lose!')
      return false
    }
    switch (position) {
      case hole:
        console.log('You fall to the void!')
        return false
      case hat:
        console.log('You win!')
        return false
      default:
        return true
    }
  }

  status() {
    console.log(this.positionX)
    console.log(this.positionY)
  }
}

const myField = new Field(Field.generateField(5, 5, 0.5))

myField.runGame()
