
const padImg = document.getElementById("padImg");

window.onload = function() 
{ 
    
}

// *Important Functions
// converts radians to degrees
function convertToDeg(input)
{
    return input * (180 / Math.PI);
}

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

// * Aims the cola can
addEventListener("mousemove", (mouse) => 
{
    let mouseY = getYPos(mouse.clientY);
    let mouseX= getXPos(mouse.clientX);

    let rotationAngle = convertToDeg(Math.atan(mouseX / mouseY));
    if (!mousedown) //!see cola can launching for mousedown conditions 
        padImg.style.transform = "rotate(" + rotationAngle +"deg)";
});

// gets the y position of the mouse on a coordinate plane centered at the bottom center of the window

// * cola can launching

// global variables
let mousedown = false;
let initialMouseY;
let currentMouseY;
let shootingPower = 1;
// activates scaling on mouse down
addEventListener("mousedown", (mouse) => 
{
    mousedown = true;
    initialMouseY = getYPos(mouse.clientY);
});

// ends scaling when mouse up
addEventListener("mouseup", (mouse) => 
{
    mousedown = false;
});

addEventListener("mousemove", (mouse) => 
{
    if (mousedown)
    {
        currentMouseY = getYPos(mouse.clientY);
        posToPwr();
        console.log(shootingPower);
    }

});

//converts mouse position to shotting power
function posToPwr() 
{
    if (currentMouseY > initialMouseY)
        return 0;
    let drawDistance = Math.abs(initialMouseY - currentMouseY);
    let screenSize = window.innerHeight;
    shootingPower = (drawDistance / screenSize) * 100;
    if (100 < shootingPower)
        shootingPower = 100;
}