var lastX = new Map(); //map of object to last mouse position
var lastY = new Map();
var posX = new Map(); //map of object to position
var posY = new Map();
var currentobj; //object being dragged

function totaloffset(elem) { //get total offset of object
  var pos = {
    top: elem.offsetTop,
    left: elem.offsetLeft
  };
  if (elem.offsetParent) {
    var p = totaloffset(elem.offsetParent);
    pos.top += p.top;
    pos.left += p.left;
  }
  return pos;
}
function getNearestElement() {
  //find the nearest blue object if it's close enough
  var elems = document.getElementsByClassName("draggable blue");
  var minDist = 65;
  var minElement;
  for (var i = 0;i<elems.length;i++) {
    var elem = elems.item(i);
    if (elem != currentobj) {
      console.log(elem.offsetTop);
      var dist = Math.sqrt(Math.pow(totaloffset(elem).top-totaloffset(currentobj).top,2) +
        Math.pow(totaloffset(elem).left-totaloffset(currentobj).left,2));
      if (dist < minDist) {
        minDist = dist;
        minElement = elem;
      }
    }
  }
  var distaa = Math.sqrt(Math.pow(posX.get(currentobj),2)+Math.pow(posY.get(currentobj),2));
  console.log(distaa);
  console.log(minDist);
  console.log(minElement);
  if (distaa<minDist) {
    minDist = distaa;
    minElement = currentobj;
  }
  return minElement;
}

function draggablemousedown(e) {
  elem = e.target;
  lastX.set(elem,e.clientX);
  lastY.set(elem,e.clientY);
  currentobj = elem;
  if (!posX.get(elem)) {
    posX.set(elem,0);
  }
  if (!posY.get(elem)) {
    posY.set(elem,0);
  }
  document.onmousemove = draggablemousemove;
  document.onmouseup = draggablemouseup;
}
function draggablemousemove() {
  e = window.event;
  var deltaX = e.clientX-lastX.get(currentobj);
  var deltaY = e.clientY-lastY.get(currentobj);
  lastX.set(currentobj,e.clientX);
  lastY.set(currentobj,e.clientY);
  posX.set(currentobj,posX.get(currentobj)+deltaX);
  posY.set(currentobj,posY.get(currentobj)+deltaY);
  elem.style.left = posX.get(currentobj) + "px";
  elem.style.top = posY.get(currentobj) + "px";
}
function draggablemouseup() {
  elem = getNearestElement();
  if (elem) {
    var text = currentobj.innerHTML;
    currentobj.innerHTML = elem.innerHTML;
    elem.innerHTML = text;
  }
  currentobj.style.left = "0px";
  currentobj.style.top = "0px";
  posX.set(currentobj,0);
  posY.set(currentobj,0);

  document.onmousemove = null;
  document.onmouseup = null;
}

function registerevents() {
  var elems = document.getElementsByClassName("draggable");
  for (var i = 0;i<elems.length;i++) {
    elems.item(i).onmousedown = draggablemousedown;
  }
}
