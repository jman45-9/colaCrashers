
const padImg = document.getElementById("padImg");

window.onload = function() 
{ 
    
}

// gets the y position of the mouse on a coordinate plane centered at the bottom center of the window
function getYPos(backwardsMouseY)
{
    return window.innerHeight - backwardsMouseY;
}

// same as getYPos but with x coordinate
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

// converts radians to degrees
function convertToDeg(input)
{
    return input * (180 / Math.PI);
}

//aims the cola can
addEventListener("mousemove", (mouse) => {
    let mouseY = getYPos(mouse.clientY);
    let mouseX= getXPos(mouse.clientX);

    let rotationAngle = convertToDeg(Math.atan(mouseX / mouseY));
    console.log(mouseX, mouseY, rotationAngle);
    padImg.style.transform = "rotate(" + rotationAngle +"deg)";
});


