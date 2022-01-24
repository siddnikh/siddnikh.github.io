let c = document.getElementById("mycanvas");
let ctx = c.getContext("2d");

let playerX = 0;  //starting positions
const playerY = 50;
const playerWidth = 100;
const playerHeight = 100;
let gameStart = false;

let frames = { // number of frames in each animation
    'idle' : 8,
    'backward': 6,
    'block' : 9,
    'forward' : 6,
    'kick' : 7,
    'punch' : 7
}

// function for loading images
let loadImage = (src) => {
    let img = document.createElement("img");
    img.src = src;
    return img;
}

// function that returns arrays of images
let loadImages = (directory, framesCount) => {
    let images = []
    for(let i = 1; i <= framesCount; i++){
        images[i - 1] = loadImage(directory + `${i}.png`);
    }
    return images;
}
// a function that takes in animation name and goes through it once
let animate = (animationName, callback) => {
    let path = document.location.pathname;
    let directory = path.substring(path.indexOf('/'), path.lastIndexOf('/')) + "/img2/" + animationName + "/";

    //getting the images in an array
    let images = loadImages(directory, frames[animationName]);
    
    images.forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, c.width, c.height);
            if(animationName === 'backward') playerX --;
            else if(animationName === 'forward') playerX ++;
            ctx.drawImage(image, playerX, playerY, playerWidth, playerHeight);
        }, index * 100);
    });

    setTimeout(callback, images.length * 100);

}

let processQueue = []; 

// onClick functions

let moveLeft = () => {
    if(gameStart) processQueue[processQueue.length] = 'backward'; 
};

let moveRight = () => {
    if(gameStart) processQueue[processQueue.length] = 'forward'; 
};

let kick = () => {
    if(gameStart) processQueue[processQueue.length] = 'kick'; 
};

let punch = () => {
    if(gameStart) processQueue[processQueue.length] = 'punch'; 
};

let block = () => {
    if(gameStart) processQueue[processQueue.length] = 'block'; 
};

let startGame = () => {
    let selectedAnimation;

    let aux = () => {
        if(processQueue.length === 0) selectedAnimation = "idle";
        else selectedAnimation = processQueue.shift();

        animate(selectedAnimation, aux);
    }

    if(gameStart === false) aux();

    gameStart = true;
}

document.onkeydown = (event) => {
    switch(event.keyCode){
        case 37:
            moveLeft();
            break;
        case 39:
            moveRight();
            break;
        case 80:
            punch();
            break;
        case 75:
            kick();
            break;
        case 66:
            block();
            break;
    }
}