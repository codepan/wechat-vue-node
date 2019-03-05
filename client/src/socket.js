export default {
  // websocket实例
  ws: null, //websocket实例
  init (config, onMessage, onError) {
    if (!this.ws) {
      this.ws = new WebSocket(`ws://localhost:3000/${config.user.id}`)
    }

    this.ws.onmessage = event => {
      console.log('前端收到了message', event.data)
      let message = JSON.parse(event.data)
      onMessage && onMessage(message)
    }
    this.ws.onerror = error => {
      onError && onError(error)
    }
    this.ws.onclose = () => {
      this.ws = null
    }
  },
  send (message) {
    this.ws.send(JSON.stringify(message))
  }
}
