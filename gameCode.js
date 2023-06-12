
const padImg = document.getElementById("padImg");

window.onload = function() 
{ 
    padImg.style.transform = "rotate(" + 45 +"deg)";
}

addEventListener("mousemove", (mouse) => {
    console.log(mouse.screenX, mouse.screenY);
    //need to make square point at mouse using trig
});