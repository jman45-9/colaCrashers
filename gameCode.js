
const padImg = document.getElementById("padImg");

window.onload = function() 
{ 
    padImg.style.transform = "rotate(" + 45 +"deg)";
}

addEventListener("mousemove", (mouse) => {
    let mouseY = getYPos(mouse.clientY);
    let mouseX= getXPos(mouse.clientX);
    console.log(mouseX, mouseY);
    //console.log(window.innerWidth, window.innerHeight);
    //console.log(mouse.clientX, mouse.clientY);
});

function getYPos(backwardsMouseY)
{
    return window.innerHeight - backwardsMouseY;
}

function getXPos(absoluteMouseX) 
{
    let screenMidpoint = (window.innerWidth / 2.0);
    if (screenMidpoint < absoluteMouseX)
    {
        let distanceFromEdge = window.innerWidth - absoluteMouseX;
        return screenMidpoint - distanceFromEdge;
    }
    if (screenMidpoint > absoluteMouseX)
    {
        return -(screenMidpoint - absoluteMouseX)
    }
}