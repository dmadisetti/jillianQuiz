var Slideshow = function(){
	this.radios = document.getElementsByName('slideshow');
	this.pictures = document.getElementsByName('slide');
	this.display = 0;
	this.interval = 50;
	this.time = this.interval;
	this.change=function(value){
		this.pictures[this.display].className="";
		this.display = value;
		this.pictures[value].className="active";		
		this.radios[value].checked=true;
		this.time = this.interval;
	}
	this.clicker = function(e){
		slideshow.change(parseInt(this.value));
	}

	var i= this.radios.length;
	while(i--){this.radios[i].onclick=this.clicker;}
}

var slideshow = new Slideshow();
window.setInterval(function(){
	if(!slideshow.time--) slideshow.change(slideshow.display + 1 == slideshow.radios.length ? 0 : slideshow.display + 1);
},100);