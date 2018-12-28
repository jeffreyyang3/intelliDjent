console.log("linked")
const url = window.location['hostname']
const webSocket = new WebSocket('ws://'+ url + ':8081')
const defaultKeybindings = JSON.stringify({
        'z': 'e',
        'x': 'f',
        'c': 'fsharp',
        'v': 'g',
        'b': 'gsharp',
        'a': 'a',
        's': 'asharp',
        'd': 'b',
        'f': 'c',
        'g': 'csharp',
        'h': 'd',
})
var app = new Vue({
	el: '#app',
	data: {
        userName: Math.floor(Math.random() * 9999999).toString(),
        keybindings: JSON.parse(defaultKeybindings),
        webSocketOpen: false,
        howls: {},
        howlIDs: {},
        pushed: {},

    },
    methods: {
        setHowls: function(bindings, howlDict, IDs){
            for(let bind in bindings){
                howlDict[bindings[bind]] = new Howl({
                    src:['sounds/' + bindings[bind] + '.mp3'],
                    html5: true
                })
                IDs[this.userName] = {}
            }
        },

    },
    mounted: function(){
        this.setHowls(this.keybindings, this.howls, this.howlIDs)
    }
})

const howls = app.howls
const howlIDs = app.howlIDs
const pushed = app.pushed
const keybindings = app.keybindings

document.addEventListener("keydown", event => {
    if(event.key in keybindings && !pushed[event.key]){
      /*  currentHowl = howls[event.key]
        currentlyPlayingID = currentHowl.play() */
        howlIDs[app.userName][keybindings[event.key]] = howls[keybindings[event.key]].play()
        pushed[event.key] = true
        if(app.webSocketOpen){
            webSocket.send(JSON.stringify({
                type: 'sound',
                play: true,
                userName: app.userName,
                soundName: keybindings[event.key],
            }))
        }
    }
})

document.addEventListener("keyup", event => {
    if(event.key in keybindings){
        pushed[event.key] = false
        howls[keybindings[event.key]].stop(howlIDs[app.userName][keybindings[event.key]])
        if(app.webSocketOpen){
            webSocket.send(JSON.stringify({
                type: 'sound',
                play: false,
                userName: app.userName,
                soundName: keybindings[event.key]
            }))
        }
    }
})




// first row: E F F# G g#
// second row: A A# B C C# D

webSocket.onopen = ()=> {
    console.log("websocket ready")
    app.webSocketOpen = true
    webSocket.onmessage = event =>{
        console.log(JSON.parse(event.data))
    }

}


























