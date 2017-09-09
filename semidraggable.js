function semidraggablemousedown(e) {
  var elem = e.target.cloneNode(true);
  elem.className = elem.className.replace("semidraggable","draggable");
  document.getElementById("draggablecontainer").appendChild(elem);
  var positionDifference = totaloffset(e.target);
  positionDifference.top -= totaloffset(elem).top;
  positionDifference.left -= totaloffset(elem).left;
  draggablemousedown(e,elem);
  posX.set(elem,positionDifference.left);
  posY.set(elem,positionDifference.top);
  elem.style.left = positionDifference.left;
  elem.style.top = positionDifference.top;
  elem.onmousedown = draggablemousedown;
}

function registersemidragevents() {
  var elems = document.getElementById("semidraggablecontainer").getElementsByClassName("semidraggable");
  for (var i = 0;i<elems.length;i++) {
    elems.item(i).onmousedown = semidraggablemousedown;
  }
}
