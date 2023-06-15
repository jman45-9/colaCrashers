
const padImg = document.getElementById("padImg");

//global variables

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
    if (!mousedown && !inFlight) //!see cola can launching for conditions 
        padImg.style.transform = "rotate(" + rotationAngle +"deg)";
});

// * Power bar class and code

class PowerBar
{
    setValue(power) 
    {
        const id = document.getElementById("powerFill");
        id.style.height = power + "%";
        id.style.backgroundColor = "hsl(" + (100 - power) + " 100% 50%)";
    }

}

let powerBar = new PowerBar();
// * cola can launching


// global variables
let mousedown = false;
let initialMouseY;
let currentMouseY;
let initialMouseX;
let shootingPower = 1;

// ** power scaling
// activates scaling on mouse down
addEventListener("mousedown", (mouse) => 
{
    mousedown = true;
    initialMouseY = getYPos(mouse.clientY);
    initialMouseX = getXPos(mouse.clientX);
});

// ends scaling when mouse up
addEventListener("mouseup", (mouse) => 
{
    mousedown = false;
    launch();
});

addEventListener("mousemove", (mouse) => 
{
    if (mousedown)
    {
        currentMouseY = getYPos(mouse.clientY);
        posToPwr();
        powerBar.setValue(shootingPower);
    }

});

//converts mouse position to shotting power
function posToPwr() 
{
    if (currentMouseY > initialMouseY)
        return 0;
    let drawDistance = Math.abs(initialMouseY - currentMouseY);
    let screenSize = window.innerHeight;
    shootingPower = ((drawDistance*2) / screenSize) * 100;
    if (100 < shootingPower)
        shootingPower = 100;
}

// ** shooting

//more globals
let launchIntervalID = 0;
let xPos = 0;
let yPos = 0;
let inFlight = false;

function launch() 
{
    let yChange = Math.abs(initialMouseY / (initialMouseX));
    let screenMidpoint = window.innerWidth / 2.0;
    // !interval timers should be factors of the power scaling
    if (0 > initialMouseX && !launchIntervalID)
    {
        inFlight = true;
        launchIntervalID = setInterval(movingLeft, 10, yChange);
    } 
    else if(!launchIntervalID)
    {
        inFlight = true;
        launchIntervalID = setInterval(movingRight, 10, yChange);
    }
}

function movingLeft(yChange)
{
    xPos += 1;
    yPos += yChange;
    padImg.style.marginRight = xPos +"px";
    padImg.style.marginBottom = yPos +"px";

    // !constants will be variables that tell the can when to stop later
    if((window.innerWidth - 10) < xPos || (window.innerHeight - 10) < yPos) 
    {
        clearInterval(launchIntervalID);
        fallIntervalID = setInterval(fall, 1);
    }   
}

function movingRight(yChange)
{
    xPos += 1;
    yPos += yChange;
    padImg.style.marginLeft = xPos +"px";
    padImg.style.marginBottom = yPos +"px";
    if((window.innerWidth - 10) < xPos || (window.innerHeight - 10) < yPos)
    {
        clearInterval(launchIntervalID);
        fallIntervalID = setInterval(fall, 1);
    }
}

let fallIntervalID;
function fall()
{
    let roundedBottom = Math.floor(parseInt(padImg.style.marginBottom));
    padImg.style.marginBottom = roundedBottom + "px";
    padImg.style.marginBottom = (roundedBottom - 5) + "px";
    if(0 >= roundedBottom)
    {
        inFlight = false
        clearInterval(fallIntervalID);
    }
}