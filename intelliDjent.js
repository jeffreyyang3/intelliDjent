console.log("linked")

const socket = io()

let app = new Vue({
	el: '#app',
	data: {
		dummy: "asdf"
	}
})





let x = new Howl({
	src: ['sounds/e.mp3'],
	html5: true
})

let pushed = {}
let currentlyPlaying = -1

document.addEventListener("keydown", event => {
    if(pushed[event.key] != true){
        pushed[event.key] = true
        currentlyPlaying = x.play()
    }
})

document.addEventListener("keyup", event => {
    pushed[event.key] = false
    x.stop(currentlyPlaying)
})




























