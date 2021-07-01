import React, { useEffect } from 'react'
import { story, latestPoint } from '../../enums/messageTypes'
import { API_URL } from '../../enums/apiURL'

const WSProvider = ({ setPoints, children }) => {
  useEffect(() => {
    const ws = new WebSocket(API_URL)

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: story }))
    }

    ws.onmessage = ({ data }) => {
      data = JSON.parse(data)

      switch (data.type) {
        case story:
          setPoints(data.data)
          break

        case latestPoint:
          setPoints(
            (prevPoints) => [
              ...prevPoints.slice(1),
              data.data
            ]
          )
          break
      }
    }
  }, [])

  return <>{children}</>
}

export default WSProvider
