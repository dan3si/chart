const { use, expect } = require('chai')
const asserttype = require('chai-asserttype');
const Message = require('../Message')
const { latestPoint, story } = require('../messageTypes')

use(asserttype);

describe('Class Message', () => {
  describe('Method generateRandomNumber', () => {
    it('should return a number', () => {
      expect(Message.generateRandomNumber()).to.be.number()
    })

    it('should be above or equal 0', () => {
      expect(Message.generateRandomNumber()).to.be.above(-1)
    })

    it('should be less than 100', () => {
      expect(Message.generateRandomNumber()).to.be.below(100)
    })
  })

  describe('Method formatDate', () => {
    it('should return a string', () => {
      expect(Message.formatDate(new Date())).to.be.string()
    })

    it('should has a length of 8', () => {
      expect(Message.formatDate(new Date())).to.have.lengthOf(8)
    })

    it('should be in format hh:mm:ss', () => {
      const result = Message.formatDate(new Date())
      const condition = !isNaN(result[0])
        && !isNaN(result[1])
        && result[2] == ':'
        && !isNaN(result[3])
        && !isNaN(result[4])
        && result[5] == ':'
        && !isNaN(result[6])
        && !isNaN(result[7])

      expect(condition).to.equal(true)
    })

    it('should return 09:12:32 for presented date', () => {
      expect(Message.formatDate(new Date(1625130752205))).to.equal('09:12:32')
    })
  })

  describe('Method createResponse', () => {
    it('should return a string', () => {
      expect(Message.createResponse(story)).to.be.string()
    })

    it('should return a valid JSON with param "latest-point"', () => {
      let validationWasSuccessfull

      try {
        JSON.parse(Message.createResponse(latestPoint))
        validationWasSuccessfull = true
      } catch {
        validationWasSuccessfull = false
      }

      expect(validationWasSuccessfull).to.equal(true)
    })

    it('should return a valid JSON with param "story"', () => {
      let validationWasSuccessfull

      try {
        JSON.parse(Message.createResponse(story))
        validationWasSuccessfull = true
      } catch {
        validationWasSuccessfull = false
      }

      expect(validationWasSuccessfull).to.equal(true)
    })

    it('should has a "data" property with object inside it, when using param "latest-point"', () => {
      const data = JSON.parse(Message.createResponse(latestPoint)).data

      expect(data).to.be.an('object')
    })

    it('should has a "time" and "point" properties inside "data", when using param "latest-point"', () => {
      const data = JSON.parse(Message.createResponse(latestPoint)).data

      expect(data).to.have.property('time')
      expect(data).to.have.property('point')
    })

    it('should has a "data" property with array of objects inside it, when using param "story"', () => {
      const data = JSON.parse(Message.createResponse(story)).data

      expect(data).to.be.an('array')
    })
  })

  describe('Method generateStory', () => {
    it('should return an array', () => {
      expect(Message.generateStory()).to.be.an('array')
    })

    it('should consists from an objects', () => {
      const condition = Message.generateStory().every(element => typeof element === 'object')

      expect(condition).to.equal(true)
    })

    it('should has a length of 80 with param 80', () => {
      expect(Message.generateStory(80)).to.have.lengthOf(80)
    })

    it('should has a length of 100 without passing any params', () => {
      expect(Message.generateStory()).to.have.lengthOf(100)
    })
  })
})
