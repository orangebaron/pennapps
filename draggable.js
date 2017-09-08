var lastX = new Map()
var lastY = new Map()
var posX = new Map()
var posY = new Map()
var currentobj
function draggablemousedown(elem) {
  e = window.event
  lastX.set(elem,e.clientX)
  lastY.set(elem,e.clientY)
  currentobj = elem
  if (!posX.get(elem)) {
    posX.set(elem,0)
  }
  if (!posY.get(elem)) {
    posY.set(elem,0)
  }
  document.onmousemove = draggablemousemove
  document.onmouseup = draggablemouseup
}
function draggablemousemove() {
  elem = currentobj
  e = window.event
  var deltaX = e.clientX-lastX.get(elem)
  var deltaY = e.clientY-lastY.get(elem)
  lastX.set(elem,e.clientX)
  lastY.set(elem,e.clientY)
  posX.set(elem,posX.get(elem)+deltaX)
  posY.set(elem,posY.get(elem)+deltaY)
  elem.style.left = posX.get(elem) + "px"
  elem.style.top = posY.get(elem) + "px"
}
function draggablemouseup() {
  document.onmousemove = null
  document.onmouseup = null
}
