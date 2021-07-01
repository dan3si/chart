const WebSocket = require('ws')
const { createResponse } = require('./Message')
const { latestPoint, story } = require('./messageTypes')
const port = process.env.PORT || 5000

const server = new WebSocket.Server({ port })

server.on(
  'connection',
  (ws) => {
    const interval = setInterval(
      () => ws.send(createResponse(latestPoint)),
      1000
    )

    ws.on(
      'message',
      (message) => {
        switch (JSON.parse(message).type) {
          case story:
            ws.send(createResponse(story))
            break
        }
      }
    )

    ws.on('close', () => {
      clearInterval(interval)
    })
  }
)

