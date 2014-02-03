// label support
// optimized from http://www.chriscassell.net/log/2004/12/19/add_label_click.html
// cause I got lazy
window.onload = function(){
var labels = []
, inputs = []
, q = 1
, a = answers[0]
, correct = 0
, question = function (){
  labels = as[q - 1].getElementsByTagName("label");
  inputs = document.getElementsByName('a'+ q++);
  for (i = 0; i < inputs.length; i++){
      labels[i].addEventListener("click", readify, false);
  }  
}
, readify = function(){
  var item = document.getElementById(this.getAttribute("for"))
  ,radios = document.getElementsByName(item.getAttribute("name"));
  item.focus();
  btn.className = 'ready';
  btn.innerHTML = 'Submit';
  for (i = 0; i < radios.length; i++){
      if (radios[i]["checked"] && radios[i] != item.getAttribute("id")){
        radios[i]["checked"] = false;
      break;
      }
  }
  item["checked"] = true;
  if(as[q - 2].classList.contains('audio')){
      restart(labels[item.value - 1].getElementsByTagName('audio')[0]);
  }
}
, qs = document.getElementsByName('q')
, as = document.getElementsByClassName('answers')
, wrappers = document.getElementsByClassName('wrapper')
, intro = document.getElementById('intro')
, cheapDisable = document.getElementById('cheapDisable')
, results = document.getElementById('results')
, btn = document.getElementById('btn')
, win = function(){
  correct++;
  qs[q - 2].classList.add("right");
  as[q - 2].classList.add("right");
}
, lose=function(){
  qs[q - 2].classList.add("wrong");
  as[q - 2].classList.add("wrong");
}
, end = function(){
  if(speech){ 
    replay.remove();
    audio.pause()
    t = 0;
  }
  btn.innerHTML = 'Restart';
  btn.className = 'restart';
  wrappers[q - 2].classList.remove('show');
  results.getElementsByClassName('question')[0].innerHTML = "Looks like you got " + correct + " out of " + as.length+".";
  results.classList.add("show");
}
, restart = function(audio){
  audio.currentTime = 0;
  audio.play();
}
, audio = document.getElementById('speech')
, replay = document.getElementById('replay')
, speech = audio != null
,check = function(){
  if(!audio.ended){
    window.setTimeout(check,10);
  }else{
    intro.classList.remove('show');
    t = new Date().getTime() + 61000;
    timer();
  }
}
, time = document.getElementById('timer')
, timer = function(){
  dt = t - new Date().getTime();
  if(dt <= 0){
    end();
  }else{
    time.innerHTML = Math.floor(dt / 60000) + ":" + Math.floor((dt%60000)/10000) + "" + Math.floor((dt%60000)/1000) % 10;
    window.setTimeout(timer,10);    
  }
}
, t = 0
, dt = 61000
, tid = 0;

btn.onclick = function(){
  switch(btn.className){
    case 'ready':
      if(inputs[a].checked) win();
      else lose();
      btn.className = 'next';
      btn.innerHTML = 'Next';
      cheapDisable.className = "show";
      break;
    case 'restart':
      window.location = "";
      break;
    case 'next':
      cheapDisable.className = "";
      if(q > qs.length){
        end();
        return;
      }
      btn.className = '';
      btn.innerHTML = 'Choose';
      qs[q - 2].checked = false;
      qs[q - 1].checked = true;
      wrappers[q - 2].classList.remove('show');
      wrappers[q - 1].classList.add('show');
      a = answers[q - 1];
      question();
      break;
    default:
      break;
  }
}
intro.onclick = function(){
  if(!speech) this.classList.remove('show');
  else {
    restart(audio);
    check();
  }
}

if(speech) replay.onclick = function(){
  restart(audio);
}

question();
}