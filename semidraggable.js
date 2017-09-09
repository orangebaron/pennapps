function semidraggablemousedown(e) {
  var elem = e.target.cloneNode(true);
  e.target = elem;
  draggablemousedown(e);
}

function registerevents() {
  var elems = document.getElementsByClassName("semidraggable");
  for (var i = 0;i<elems.length;i++) {
    elems.item(i).onmousedown = semidraggablemousedown;
  }
}
