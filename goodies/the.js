var Slideshow = function(){
	
	// Some declaration
	this.radios = document.getElementsByName('slideshow');
	this.pictures = document.getElementsByName('slide');
	this.display = 0;
	this.interval = 50;
	this.time = this.interval;

	// Helper functions
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

	// Set all the radios to respond to click
	var i= this.radios.length;
	while(i--){this.radios[i].onclick=this.clicker;}

	// Set her ticking
	window.setInterval(function(){
		if(!slideshow.time--) slideshow.change(slideshow.display + 1 == slideshow.radios.length ? 0 : slideshow.display + 1);
	},100);	
}

var Articles = function(){
	
	// Some declaration
	this.articles = document.getElementsByClassName('article');
	this.tabs = document.getElementsByClassName('topic');
	this.display = 0;

	// Helper functions
	this.change=function(value){
		this.articles[this.display].id = "";
		this.tabs[this.display].id = "";
		this.display = value;
		this.tabs[this.display].id = "selected";
		this.articles[this.display].id = "active";
	}
	this.clicker = function(e){
		var evt = e ? e:window.event;
		if (evt.preventDefault) evt.preventDefault();
		articles.change(parseInt(evt.target.parentNode.attributes.value.value));
	}

	// Set all the tabs to respond to click
	var i= this.tabs.length;
	while(i--){this.tabs[i].onclick=this.clicker;}

}

switch(window.location.pathname){
	case '/':
		var slideshow = new Slideshow();
		break;
	case '/research':
	case '/projects':
		var articles = new Articles();
		break;
	default:
		break;
}