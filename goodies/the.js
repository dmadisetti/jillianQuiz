var Slideshow = function(){
	this.radios = document.getElementsByName('slideshow');
	this.pictures = document.getElementsByName('slide');
	this.display = 0;
	this.clicker = function(e){
		slideshow.pictures[slideshow.display].className="";
		console.log(e);
		slideshow.display = this.value;
		slideshow.pictures[slideshow.display].className="active";
	}
	var i = this.radios.length;
	while(i--){this.radios[i].onclick=this.clicker;}
}

var slideshow = new Slideshow();