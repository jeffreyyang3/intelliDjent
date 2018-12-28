const express  = require('express')
const app = express()
const http = require('http').Server(app)
const webSocket = require('ws')
const webSocketServer = new webSocket.Server({server: app.listen(8081)})

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.get('/intelliDjent.js', (request, response) => {
    response.sendFile(__dirname + '/intelliDjent.js')
})

app.get('/sounds/:fileName', (request, response) => {
    response.sendFile(__dirname + '/sounds/' +
        request.params['fileName'])
})

http.listen(3000, ()=>{
    console.log('listening on 3000')
})
counter = 0
webSocketServer.on('connection', clientSocket => {
    console.log("client connected")
    clientSocket.on('message', message => {
        console.log(counter += 1)
        webSocketServer.clients.forEach(client => {
            client.send(message)
        })
    })
})
