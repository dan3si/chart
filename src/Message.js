const { latestPoint, story } = require('./messageTypes')

class Message {
  formatDate = (date) => date.toUTCString().split(' ')[4]

  generateRandomNumber = () => Math.floor(Math.random() * 100)

  generateStory = (size = 100) => {
    const result = []
    const dateNow = Date.now()
  
    for (let i = 0; i < size * 1000; i += 1000) {
      result.push({
        time: this.formatDate(new Date(dateNow - i)),
        point: this.generateRandomNumber()
      })
    }
  
    return result
  }

  createResponse = (type) => {
    switch (type) {
      case story:
        return JSON.stringify({
          type: story,
          data: this.generateStory()
        })

      case latestPoint:
        return JSON.stringify({
          type: latestPoint,
          data: {
            time: this.formatDate(new Date()),
            point: this.generateRandomNumber()
          }
        })
    }
  }
}

module.exports = new Message()
