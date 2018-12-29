const express  = require('express')
const app = express()
const http = require('http').Server(app)
const webSocket = require('ws')
const webSocketServer = new webSocket.Server({server: app.listen(8081)})
const path = require('path')
const ip = require("ip")
const favicon = require('serve-favicon')

app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')))

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
    console.log("listening on " + ip.address() + ":" + "3000")
})

webSocketServer.on('connection', clientSocket => {
    console.log("client connected")
    clientSocket.on('message', message => {
        webSocketServer.clients.forEach(client => {
            client.send(message)
        })
    })
})
