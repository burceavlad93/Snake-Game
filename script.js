'use strict'
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let currentKey;
let movement;                                                                                       // Creating variable for setInterval function    
let foodLocation;                                                                                   // Creating variable for food location;     
let inGameScore = 0;                                                                                // Creating in game score variable
let previousKey = "ArrowRight";
let gameON = true;                                                                                  // Boolean value for GAME State
let interval = 100;                                                                                 // The speed at which the snake travels
let snake = [506, 505, 504];                                                                        // Creating snake object
let gameScore = document.getElementById('score');                                                   // Creating score object
const gameContainer = document.getElementById('main');                                              // Creating game container object
const resetBtn = document.getElementById('restart_btn');                                            // Creating reset button object
//------------------------------------------------------------------GENERATIN GAME MAP-------------------------------------------------------------------------------------------------------------------------------------
for (let i = 0; i < 625; ++i) {                                                                     // Game map will have a total of 625 units
    gameContainer.innerHTML += `<div class="unit ${i}"> </div>`;                                    // Each unit will be given a class name and number
}

const gameBoard = document.querySelectorAll('.unit');                                               // Creating game board object
drawSnake();                                                                                        // Calling draw snake function
generateFood();                                                                                     // Calling generate food function and saving the food location
//-----------------------------------------------------------------KEY PRESSED-------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('keydown', function (key) {                                               // Creating an event listener to identify which key was pressed
    if (gameON) {
        if (key.code == "ArrowUp" && previousKey != "ArrowDown") {
            clearInterval(movement);
            movement = setInterval(snakeGameplay, interval, key.code);
            previousKey = "ArrowUp";
        } else if (key.code == "ArrowDown" && previousKey != "ArrowUp") {
            clearInterval(movement);
            movement = setInterval(snakeGameplay, interval, key.code);
            previousKey = "ArrowDown";
        } else if (key.code == "ArrowRight" && previousKey != "ArrowLeft") {
            clearInterval(movement);
            movement = setInterval(snakeGameplay, interval, key.code);
            previousKey = "ArrowRight";
        } else if (key.code == "ArrowLeft" && previousKey != "ArrowRight") {
            clearInterval(movement);
            movement = setInterval(snakeGameplay, interval, key.code);
            previousKey = "ArrowLeft";
        } else if (key.code == "Escape") {
            clearInterval(movement);
        }
    }
});
//-----------------------------------------------------------------RESET GAME---------------------------------------------------------------------------------------------------------------------------------------------------
resetBtn.addEventListener('click', function () {                                                    // Adding functionalitii to the PLAY AGAIN button
    location.reload();                                                                              // Reloads the page and sets everything back
})
//------------------------------------------------------------------DRAW SNAKE--------------------------------------------------------------------------------------------------------------------------------------------
function drawSnake() {                                                                              // Creating draw snake function
    for (let j = 0; j < gameBoard.length; ++j) {
        if (snake.includes(j)) {
            gameBoard[j].style.backgroundColor = 'black';
        }
    }
}
//-----------------------------------------------------------------GENERATE FOOD-----------------------------------------------------------------------------------------------------------------------------------------------
function generateFood() {                                                                           // Creating generate food function
    foodLocation = Math.floor(Math.random() * (624 - 0 + 1) + 0);                                   // Generates a random number between 0 and 624
    if (!snake.includes(foodLocation)) {
        gameBoard[foodLocation].style.backgroundColor = 'red';
        return foodLocation;
    } else {
        return generateFood();
    }
}
//------------------------------------------------------------------GAMEPLAY FUNCTIONS--------------------------------------------------------------------------------------------------------------------------------------
function snakeGameplay(direction) {
    if (direction == "ArrowUp") snake.unshift(snake[0] - 25);
    if (direction == "ArrowDown") snake.unshift(snake[0] + 25);
    if (direction == "ArrowRight") snake.unshift(snake[0] + 1);
    if (direction == "ArrowLeft") snake.unshift(snake[0] - 1);

    drawSnake();
    collision();

    if (foodLocation == snake[0]) {
        generateFood();
        score();
        speed();
    } else {
        removeTail();
    }
}
//------------------------------------------------------------------REMOVE FUNCTIONS--------------------------------------------------------------------------------------------------------------------------------------
function removeTail() {
    gameBoard[snake[snake.length - 1]].style.backgroundColor = 'gainsboro';
    snake.pop();
}
//-----------------------------------------------------------------COLLISION---------------------------------------------------------------------------------------------------------------------------------------------------
function collision() {                                                                              // Creating collision function
    // --> Top side & Bottom side collision
    if (snake[0] < 0 || snake[0] > 624) {
        clearInterval(movement);
        gameON = false;
    }
    // --> Side wall collision
    if (snake[1] % 25 == 24 && snake[0] % 25 == 0 || snake[0] % 25 == 24 && snake[1] % 25 == 0) {   // If the first two element of the snake array are equal to the left of right edge, then it's out of bounds
        gameBoard[snake[0]].style.backgroundColor = 'gainsboro';                                    // Changing snake's head color so that it will not come out from out of bounds                
        clearInterval(movement);                                                                    // The movement of the snake will be stopped 
        gameON = false;                                                                             // The game will end
    }
    // --> Collision with itself
    if (snake.includes(snake[0], 3)) {
        clearInterval(movement);
        gameON = false;
    }
}
//-----------------------------------------------------------------SCORE-------------------------------------------------------------------------------------------------------------------------------------------------------
function score() {                                                                                  // Creating score function
    ++inGameScore;                                                                                  // Incrementing in game score variable
    gameScore.textContent = `Score ${inGameScore}`;                                                 // Posting in game score
}
//-----------------------------------------------------------------SPEED-------------------------------------------------------------------------------------------------------------------------------------------------------
function speed() {                                                                                  // Creating speed function
    if (inGameScore % 125 == 0) {                                                                   // If the score can be divided by 125;
        interval -= 10;
    }
}
