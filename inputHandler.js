//Keybboard controller
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: //Left Arrow
    buttons.left = true;
    break;
    case 39: //Right Arrow
    buttons.right = true;
    break;
    case 38: //Up Arrow
    buttons.up = true;
    break;
    case 40: //Down Arrow
    buttons.down = true;
    break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 37: //Left Arrow
    buttons.left = false;
    break;
    case 39: //Right Arrow
    buttons.right = false;
    break;
    case 38: //Up Arrow
    buttons.up = false;
    break;
    case 40: //Down Arrow
    buttons.down = false;
    break;
  }
});
document.getElementById("showmap").addEventListener("click",()=>{
  if(showMap)showMap=false;
  else showMap=true;
})

//Mobile devices
document.ontouchstart = ()=>{
  document.getElementById("controller").style.display = "block";
  document.getElementById("showmap").style.display = "none";
}

document.getElementById("left").addEventListener("touchstart",()=>buttons.left=true);
document.getElementById("left").addEventListener("touchend",()=>buttons.left=false);
document.getElementById("up").addEventListener("touchstart",()=>buttons.up=true);
document.getElementById("up").addEventListener("touchend",()=>buttons.up=false);
document.getElementById("right").addEventListener("touchstart",()=>buttons.right=true);
document.getElementById("right").addEventListener("touchend",()=>buttons.right=false);
document.getElementById("down").addEventListener("touchstart",()=>buttons.down=true);
document.getElementById("down").addEventListener("touchend",()=>buttons.down=false);
document.getElementById("map").addEventListener("touchstart",()=>{
  if(showMap)showMap=false;
  else showMap=true;
})
