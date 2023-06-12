
const padImg = document.getElementById("padImg");

window.onload = function() 
{ 
    
}

addEventListener("mousemove", (mouse) => {
    let mouseY = getYPos(mouse.clientY);
    let mouseX= getXPos(mouse.clientX);

    let rotationAngle = convertToDeg(Math.atan(mouseX / mouseY));
    //if(rotationAngle)
    console.log(mouseX, mouseY, rotationAngle);
    padImg.style.transform = "rotate(" + rotationAngle +"deg)";
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
        return -(screenMidpoint - absoluteMouseX);
    }
    return 0;
}

function convertToDeg(input)
{
    return input * (180 / Math.PI);
}