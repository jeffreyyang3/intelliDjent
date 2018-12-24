console.log("linked")


let app = new Vue({
		el: '#app',
		data: {
				dummy: "asdf"
		}
})                      



let x = new Howl({
		    src: ['sounds/acoustic-snare.mp3'],
			html5: true
})
console.log("asdf")
console.log(document.getElementById("test"))
document.addEventListener("click", function(){
		x.play()
})





























