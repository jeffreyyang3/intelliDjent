console.log("linked")

const socket = io()

let app = new Vue({
	el: '#app',
	data: {
		dummy: "asdf"
	}
})

setHowls = (bindings, howlDict, IDs) => {
    for(let bind in bindings){
        howlDict[bind] = new Howl({
            src:['sounds/' + keybindings[bind] + '.mp3'],
            html5: true
        })
        IDs[bind] = -1
    }
}


let keybindings = {
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
}


const defaults = JSON.stringify(keybindings)
let howls = {}
let howlIDs = {}
let pushed = {}
setHowls(keybindings, howls, howlIDs)

// if there is a sound playing, 
//  



document.addEventListener("keydown", event => {
    if(event.key in keybindings && !pushed[event.key]){
      /*  currentHowl = howls[event.key]
        currentlyPlayingID = currentHowl.play() */
        howlIDs[event.key] = howls[event.key].play()
        pushed[event.key] = true
    }
})

document.addEventListener("keyup", event => {
    if(event.key in keybindings){
        pushed[event.key] = false
        howls[event.key].stop(howlIDs[event.key])
    }
})


// first row: E F F# G g#
// second row: A A# B C C# D










