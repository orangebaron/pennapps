var lastX = new Map(); //map of object to last mouse position
var lastY = new Map();
var posX = new Map(); //map of object to position
var posY = new Map();
var currentobj; //object being dragged
var isGreen; //is currentobj green?

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
  if (isGreen) {
    //find which element it should come before
    var i = 0;
    var allGreens = document.getElementsByClassName("draggable green");
    while (true) {
      if (i >= allGreens.length) { //reached the end of element list
        if (elem == currentobj) {
          return posY.get(currentobj) > 65 ? null : "end";
        }
        if (totaloffset(currentobj).top-totaloffset(elem).top > 65) {
          return null
        } else {
          return "end"
        }
      }
      var elem = allGreens.item(i)
      if (elem != currentobj && totaloffset(elem).top > totaloffset(currentobj).top) {
        return elem;
      }
      i++;
    }
  } else {
    //find the nearest blue object if it's close enough
    var elems = document.getElementsByClassName("draggable blue");
    var minDist = 65;
    var minElement;
    for (var i = 0;i<elems.length;i++) {
      var elem = elems.item(i);
      if (elem != currentobj) {
        var dist = Math.sqrt(Math.pow(totaloffset(elem).top-totaloffset(currentobj).top,2) +
          Math.pow(totaloffset(elem).left-totaloffset(currentobj).left,2));
        if (dist < minDist) {
          minDist = dist;
          minElement = elem;
        }
      }
    }
    var dist = Math.sqrt(Math.pow(posX.get(currentobj),2)+Math.pow(posY.get(currentobj),2));
    if (dist<minDist) {
      minDist = dist;
      minElement = currentobj;
    }
    return minElement;
  }
}
var highlightedDiv;
function highlightDiv(elem,red) {
  if (highlightedDiv) {
    highlightedDiv.style.border = "none";
  }
  if (elem) {
    if (red) {
      elem.style.border = "thick solid red";
    } else if (isGreen) {
      if (elem == "end") {
        var allGreens = document.getElementsByClassName("draggable green");
        elem = allGreens.item(allGreens.length-1);
        elem.style.borderBottom = "thick solid yellow";
      } else {
        elem.style.borderTop = "thick solid yellow";
      }
    } else {
      elem.style.border = "thick solid yellow";
    }
  }
  highlightedDiv = elem;
}

function draggablemousedown(e) {
  elem = e.target;
  if (elem.innerHTML == "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") {
    return;
  }
  isGreen = elem.className.search("green") != -1;
  lastX.set(elem,e.clientX);
  lastY.set(elem,e.clientY);
  currentobj = elem;
  posX.set(elem,0);
  posY.set(elem,0);
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
  currentobj.style.left = posX.get(currentobj) + "px";
  currentobj.style.top = posY.get(currentobj) + "px";

  var elem = getNearestElement();
  if (elem) {
    highlightDiv(elem);
  } else {
    highlightDiv(currentobj,true);
  }
}
function draggablemouseup() {
  elem = getNearestElement();
  if (isGreen) {
    if (elem == "end") {
      currentobj.parentElement.appendChild(currentobj);
      currentobj.style.left = "0px";
      currentobj.style.top = "0px";
    } else if (elem) {
      console.log(elem);
      currentobj.parentElement.insertBefore(currentobj,elem);
      currentobj.style.left = "0px";
      currentobj.style.top = "0px";
    } else {
      currentobj.parentElement.removeChild(currentobj);
    }
  } else {
    if (elem) {
      var text = currentobj.innerHTML;
      currentobj.innerHTML = elem.innerHTML;
      elem.innerHTML = text;
    } else {
      currentobj.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    currentobj.style.left = "0px";
    currentobj.style.top = "0px";
  }

  document.onmousemove = null;
  document.onmouseup = null;

  highlightDiv(null);
}

function registerevents() {
  var elems = document.getElementsByClassName("draggable");
  for (var i = 0;i<elems.length;i++) {
    elems.item(i).onmousedown = draggablemousedown;
  }
}
