function fixValOfElem(elem) {
  elem.defaultValue = elem.value;
}
function fixAllElemVals(elem) {
  if (elem.tagName == "INPUT") {
    fixValOfElem(elem);
  }
  var inputs = document.getElementsByTagName("INPUT");
  for (var i=0;i<inputs.length;i++) {
    fixValOfElem(inputs.item(i));
  }
}
function saveblocks() {
  fixAllElemVals(document.body);
  download("script.html", document.getElementById("draggablecontainer").innerHTML);
}
