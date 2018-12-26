app = require('express')()
http = require('http').Server(app)

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

