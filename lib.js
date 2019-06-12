var slides = [
  "into",
  "why_stay",
  "whoami",
  "slide_info",
  "instalation",
  "ev_info",
  "malware",
	"xss_intro",
	"difficult",
	"trace_depth",
	"eval",
	"innerhtml",
	"features",
	"needle",
	"100story",
	"waf",
];

function goToStart(){
  document.location = getFileFromIndex(0);
}

function numInSlides(num){
  for (let i in slides){
    if ( slides[i] == num ) 
      return true;
  }
  return false;
}

function getFileFromIndex(i){
  return "../" + slides[i] + "/index.html"
}

function getCurrentNum(){
  let path = new URL(document.location).pathname;
  let m = path.match(/\/([^\/]+)\/index\.html$/);
  return slides.indexOf(m[1]);
}

function getNext(){
  let num = getCurrentNum();
  if ( num == null ) return null;
  num += 1;
  if (num >= slides.length) return null;
  return getFileFromIndex(num);
}

function getPrev(){
  let num = getCurrentNum();
  if ( num == null ) return null;
  num -= 1;
  if ( num < 0 ) return null;
  return getFileFromIndex(num);
}

function makeNav(){
  function makeTag(href, text, id){
    var a = document.createElement("a");
    a.id = id;
    a.innerText = text;
    a.href = href;
    return a;
  }

  let t = getPrev();
  if ( t ) {
    document.body.append(makeTag(t, "<< prev", "prev"));
    document.body.append(document.createElement("br"));
  }
  t = getNext();
  if ( t )
    document.body.append(makeTag(t, "next >>", "next"));
}

document.body.onkeydown = function(e) {
  let t = null;
  if(e.keyCode == 37) { // left
    t = document.getElementById("prev");
  }
  else if([39, 32].includes(e.keyCode)) { // right, space
    t = document.getElementById("next");
  }
  if (t) t.click();
}

makeNav();
