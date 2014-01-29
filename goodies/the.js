// label support
// optimized from http://www.chriscassell.net/log/2004/12/19/add_label_click.html
// cause I got lazy
var labels = []
, inputs = []
, q = 1
, a = answers[0]
, correct = 0
, addLabelFocus = function (){
  var item = document.getElementById(this.getAttribute("for"))
  ,radios = document.getElementsByName(item.getAttribute("name"));
  item.focus();
  for (i = 0; i < radios.length; i++){
      if (radios[i]["checked"] && radios[i] != item.getAttribute("id")){
        radios[i]["checked"] = false;
      break;
      }
  }
  item["checked"] = true;
}
, question = function (){
  labels = as[q - 1].getElementsByTagName("label");
  inputs = document.getElementsByName('a'+ q++);
  for (i = 0; i < inputs.length; i++){
      labels[i].addEventListener("click", readify, false);
  }  
}
, readify = function(){
  btn.className = 'ready';
  btn.innerText = 'Submit';
}
, qs = document.getElementsByName('q')
, as = document.getElementsByClassName('answers')
, wrappers = document.getElementsByClassName('wrapper')
, intro = document.getElementById('intro')
, cheapDisable = document.getElementById('cheapDisable')
, results = document.getElementById('results')
, btn = document.getElementById('btn');
btn.onclick = function(){
  switch(btn.className){
    case 'ready':
      if(inputs[a].checked) win();
      else lose();
      btn.className = 'next';
      btn.innerText = 'Next';
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
      btn.innerText = 'Choose';
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
  this.classList.remove('show');
}

win = function(){
  correct++;
  qs[q - 2].classList.add("right");
  as[q - 2].classList.add("right");
}

lose=function(){
  qs[q - 2].classList.add("wrong");
  as[q - 2].classList.add("wrong");
}

end = function(){
  btn.innerText = 'Restart';
  btn.className = 'restart';
  wrappers[q - 2].classList.remove('show');
  results.getElementsByClassName('question')[0].innerText = "Looks like you got " + correct + " out of " + as.length+".";
  results.classList.add("show");
}

for (i = 0; i < labels.length; i++){
    labels[i].onclick = addLabelFocus;
}

question()