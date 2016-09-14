var snakes = require('./snake.js');


var canvas = document.getElementById("snakeCanvas"),
	context = canvas.getContext("2d");

var Game = function(){

}
Game.prototype = {
	start: function(){
		this.init();
	},
	stop: function(){

	},
	init: function(){
		console.log("context:",context);

		var resetCanvas= function() {
		    context.clearRect(0, 0, canvas.width, canvas.height);
		}

		context.fillStyle = '#999';
		context.font = (canvas.height) + 'px Impact, sans-serif';
		context.textAlign = 'center';
		context.fillText("37", canvas.width / 2, canvas.height * 0.9);
		resetCanvas();
		context.fillText("5", canvas.width / 2, canvas.height * 0.9);
	}
}

var Snake = function(){
	this.direction = "left"
}
Snake.prototype = {
	move: function(){

	}
}
new Game().start();



var requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame;



console.log(snakes);