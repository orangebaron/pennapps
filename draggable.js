var lastX = new Map(); //map of object to last mouse position
var lastY = new Map();
var posX = new Map(); //map of object to position
var posY = new Map();
var currentobj; //object being dragged
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
  //find the nearest blue object and snap to it if it's close enough
  var elems = document.getElementsByClassName("draggable blue");
  var minDist = 65;
  var minElement;
  for (var i = 0;i<elems.length;i++) {
    var elem = elems.item(i);
    var dist = Math.sqrt(Math.pow(elem.offsetTop-currentobj.offsetTop,2) +
      Math.pow(elem.offsetLeft-currentobj.offsetLeft,2));
    if (dist < minDist && elem != currentobj) {
      minDist = dist;
      minElement = elem;
    }
  }
  if (minElement) {
    var text = currentobj.innerHTML;
    currentobj.innerHTML = minElement.innerHTML;
    minElement.innerHTML = text;
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
