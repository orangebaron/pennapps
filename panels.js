var currentpanel;
function showpanel(id) {
  console.log(currentpanel);
  if (currentpanel) {
    document.getElementById(currentpanel).className = "panel bottom";
  }
  document.getElementById(id).className = "panel top";
  currentpanel = id;
}
