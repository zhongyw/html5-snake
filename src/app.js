

var snakes = require('./snake.js');


var canvas = document.getElementById("snakeCanvas"),
	context = canvas.getContext("2d");
var resetCanvas= function() {
		    context.clearRect(0, 0, canvas.width, canvas.height);
		};
var Game = function(){
	this.snake = new Snake();
	this.feed = null;
};

Game.prototype = {
	start: function(){
		this.init();
	},
	stop: function(){

	},
	init: function(){
		this.loop();
		var me = this;
		document.onkeydown = function(e){
			e = e || window.event;
			if(e.keyCode == '38'){
				me.snake.direction = 'top';
				// up arrow
			}else if(e.keyCode == '40'){
				me.snake.direction = 'bottom';
				//down arrow
			}else if(e.keyCode == '37'){
				me.snake.direction = 'left';
				//left arrow
			}else if(e.keyCode == '39'){
				me.snake.direction = 'right';
			}
		}
	},
	refreshFeedRandom: function(){
		this.feed = {x:Math.random()*canvas.width, y: Math.random()*canvas.height};
		
	},
	drawFeed: function(){
		if(this.feed){

			this.snake.polygon(context,4, this.feed.x, this.feed.y, this.snake.radius, Math.PI/4);
			console.log("feed drawed");
		}
	},
	grown: function(){
		if(!this.feed)	this.refreshFeedRandom();
		// 碰撞测试
		var reach = false;
		if (this.feed.x < this.snake.x + 10 &&
			this.feed.x + 10 > this.snake.x &&
			this.feed.y < this.snake.y + 10 &&
			10 + this.feed.y > this.snake.y) {
			// collision detected!
			reach = true;
		}

		if(reach){
			this.feed.x = this.snake.x;
			this.feed.y = this.snake.y;
			this.snake.sects.push(this.feed);
			this.refreshFeedRandom();
		}
	},
	loop: function(){
		var me = this;
		var goLoop = function(){
			me.loop();
		};
		this.snake.move();
		this.drawFeed();
		this.snake.draw();
		this.grown();
		//console.log("12312");
		setTimeout(goLoop, 30);
	}
};

var Snake = function(){
	this.direction = "bottom";
	this.x = 50;
	this.y = 50;
	this.radius = 10;
	this.sects = [
		{
			x: 50,y: 50
		},{
			x: 50,y: 65
		},{
			x: 50,y: 80
		}
	];
}
Snake.prototype = {
	draw: function(){
		resetCanvas();
		

		context.fill();
		// context.stroke();
		
	},
	move: function(){
		context.fillStyle = '#249727';
		context.beginPath();
		for(var i = 0; i < this.sects.length; i++){
			var sect = this.sects[i];
			this.polygon(context,6, sect.x, sect.y, this.radius, Math.PI/6);
		}
		
		
		if(this.direction === "left"){
			this.x -= 1;
		}else if(this.direction === "right"){
			this.x += 1;
		}else if(this.direction === "top"){
			this.y -= 1;
		}else{
			this.y += 1;
		}
		this.sects.push({x: this.x, y: this.y});

		this.sects.shift();
	},
	polygon(c,n,x,y,r,angle,counterclockwise){
		angle = angle || 0;
		counterclockwise = counterclockwise || false;
		c.moveTo(x + r*Math.sin(angle), y - r*Math.cos(angle));
		var delta = 2*Math.PI/n;

		for(var i = 1; i < n; i++){
			angle += counterclockwise ? -delta: delta;
			c.lineTo(x + r*Math.sin(angle), y - r*Math.cos(angle));
		}
		c.closePath();
	}
}
new Game().start();



var requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame;



