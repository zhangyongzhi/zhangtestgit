var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

/*var img=new Image()
img.src="img/32eaa4054704e13ef074c1e64a46c44b.jpg"
*/

var opt = {
	particleAmount: 20, //例子个数
	defaultSpeed: 0.3, //粒子运动速度
	variantSpeed: 1, //粒子运动速度的变量
	defaultRadius: 10, //离子半径
	variantRadius: 2, //离子半径变量
	particleColor: "rgb(234,236,237)", //例子颜色

	lineColor: 'rgb(234,236,237)',
	minDistance: 350
}

var particle = [],
	w,
	h;
var line = [234,236,237]

function getSize() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
}
//创建一个例子类
function Particle() {
	this.x = Math.random() * w //x轴坐标
	this.y = Math.random() * h //y轴坐标
	this.speed = opt.defaultSpeed //速度
	this.directionAngle = Math.floor(Math.random() * 360) //运动方向
	this.color = opt.particleColor, //颜色
		this.radius = opt.defaultRadius, //半径

		this.vector = {
			x: this.speed * Math.cos(this.directionAngle), //x轴速度
			y: this.speed * Math.cos(this.directionAngle) //y轴速度

		}
	this.updata = function() { //粒子更新函数
		//console.log('updata')
		this.border();
		this.x += this.vector.x;
		this.y += this.vector.y;

	}
	this.border = function() { //判断到达边界
		if(this.x >= w || this.x <= 0) {
			this.vector.x *= -1;
		}
		if(this.y >= h || this.y <= 0) {
			this.vector.y *= -1;
		}
	}

	this.draw = function() { //画
		//console.log('draw')
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2) //圆心，半径，起始角，结束角
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill() //画完了
	}

}

function loop() {
	console.log('loop')
	ctx.clearRect(0, 0, w, h);
	//ctx.drawImage(img,0,0,w,h)
	for(var i = 0; i < particle.length; i++) { //通过循环对每个粒子进行操作
		particle[i].updata();
		particle[i].draw();
	}
	//线
	for(let i = 0; i < particle.length; i++) {
		linePoint(particle[i], particle)
	}
	console.log(Date.now())
	window.requestAnimationFrame(loop);
}

function init() {
	console.log('init')
	getSize();
	for(var i = 0; i < opt.particleAmount; i++) { //将粒子类实例化 并通过循环 加到粒子数组中去
		particle.push(new Particle())
	}
	loop();
}
init()

function linePoint(point, hub) {
	//console.log('linepoint')
	for(let i = 0; i < hub.length; i++) {
		let distance = getDistance(point, hub[i]);//用一个粒子 和数组中所有其他粒子作比较
		let opacity = 1 - distance / opt.minDistance;
		if(opacity > 0) {//如果距离小于最小距离
			ctx.lineWidth = 0.5;
			ctx.strokeStyle = "rgba(" + line[0] + "," + line[1] + "," + line[2] + "," + opacity + ")";
			ctx.beginPath();
			ctx.moveTo(point.x, point.y);
			ctx.lineTo(hub[i].x, hub[i].y);
			ctx.closePath();
			ctx.stroke();
		}
	}
}

function getDistance(point1, point2) {
	return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}