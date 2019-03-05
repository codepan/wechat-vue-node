const WebSocket = require('ws')
const webSocketServer = new WebSocket.Server({port: 3000})

// 定义连接到webSocket的客户端
// userId-----> websocket
let clientMap = new Map()

webSocketServer.on('connection', (websocket, request) => {
  const userId = request.url.split('/')[1]
  if (!clientMap.has(userId)) {
    clientMap.set(userId, websocket)
  }

  console.log(clientMap.keys())
  websocket.on('message', data => {
    console.log('onmessage', data)
    const message = JSON.parse(data)
    clientMap.forEach((client, userId) => {
      console.logId, message.target)
      if (client.readyState === 1) {
        if (userId === message.target) {
          console.log('广播消息')
          client.send(JSON.stringify({
            message: message.message,
            from: message.current
          }))
        }
      }
    })
  })
})
