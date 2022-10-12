'use strict'
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let currentKey;
let movement;                                                                                       // Creating variable for setInterval function    
let foodLocation = [{ x: -1, y: -1 }];                                                              // Creating variable for food location;     
let inGameScore = 0;                                                                                // Creating in game score variable
let previousKey = "ArrowRight";
let gameON = true;                                                                                  // Boolean value for GAME State
let interval = 100;                                                                                 // The speed at which the snake travels
let grid = new Array(25);                                                                           // Game board
let squareUnit;                                                                                     // Board elements 
let snake = [                                                                                       // Snake Object
    { x: 20, y: 6 },
    { x: 20, y: 5 },
    { x: 20, y: 4 }
];
let gameScore = document.getElementById('score');                                                   // Creating score object
const gameContainer = document.getElementById('main');                                              // Creating game container object
const resetBtn = document.getElementById('restart_btn');                                            // Creating reset button object
//------------------------------------------------------------------GAME LOGIC---------------------------------------------------------------------------------------------------------------------------------------------------
drawMap();                                                                                          // Calling 'drawMap' function
drawSnake();                                                                                        // Calling 'drawSnake' function
generateFood();                                                                                     // Calling 'generateFood' function
document.addEventListener('keydown', function (key) {                                               // Creating an event listener to identify which key was pressed
    if (gameON) {
        if (key.code == "ArrowUp" && previousKey != "ArrowDown") {                                  // Moving snake object UP
            clearInterval(movement);
            movement = setInterval(snakeGameplay, interval, key.code);
            previousKey = "ArrowUp";
        } else if (key.code == "ArrowDown" && previousKey != "ArrowUp") {                           // Moving snake object DOWN
            clearInterval(movement);
            movement = setInterval(snakeGameplay, interval, key.code);
            previousKey = "ArrowDown";
        } else if (key.code == "ArrowRight" && previousKey != "ArrowLeft") {                        // Moving snake object RIGHT
            clearInterval(movement);
            movement = setInterval(snakeGameplay, interval, key.code);
            previousKey = "ArrowRight";
        } else if (key.code == "ArrowLeft" && previousKey != "ArrowRight") {                        // Moving snake object LEFT
            clearInterval(movement);
            movement = setInterval(snakeGameplay, interval, key.code);
            previousKey = "ArrowLeft";
        } else if (key.code == "Escape") {                                                          // PAUSE GAME
            clearInterval(movement);
        }
    }
});
//------------------------------------------------------------------RESET BUTTON-------------------------------------------------------------------------------------------------------------------------------------------------
resetBtn.addEventListener('click', function () {
    location.reload();
});
//------------------------------------------------------------------DRAW MAP FUNCTION--------------------------------------------------------------------------------------------------------------------------------------------
function drawMap() {                                                                                // Creating the game board                                                                       
    let element = -1;
    for (let row = 0; row < grid.length; row++) {
        grid[row] = new Array(25);
        for (let col = 0; col < grid[row].length; ++col) {
            squareUnit = document.createElement('div');
            squareUnit.setAttribute('class', 'unit');
            squareUnit.setAttribute('id', `${++element}`)
            squareUnit.dataset.position = `x: ${row} y: ${col}`;
            gameContainer.append(squareUnit);
            grid[row][col] = document.getElementById(`${element}`);
        }
    }
}
//------------------------------------------------------------------DRAW SNAKE FUNCTION------------------------------------------------------------------------------------------------------------------------------------------
function drawSnake() {                                                                              // Creating the snake on the board
    for (let i = 0; i < snake.length; ++i) {
        grid[snake[i].x][snake[i].y].style.backgroundColor = 'black';
    }
}
//------------------------------------------------------------------GENERATE FOOD FUNCTION---------------------------------------------------------------------------------------------------------------------------------------
function generateFood() {                                                                           // Generates a random position for the food on the x and y axis
    let xFoodLocation = Math.floor(Math.random() * (24 - 0 + 1) + 0);
    let yFoodlocation = Math.floor(Math.random() * (24 - 0 + 1) + 0);
    for (let i = 0; i < snake.length; ++i) {                                                        // If the position generated is on the snakes's body, return the current function and try finding a valid position
        if (snake[i].x == xFoodLocation && snake[i].y == yFoodlocation) {
            return generateFood();
        }
    }
    grid[xFoodLocation][yFoodlocation].style.backgroundColor = 'red';
    return foodLocation[0].x = xFoodLocation, foodLocation[0].y = yFoodlocation;
}
//------------------------------------------------------------------SNAKE GAMEPLAY FUNCTION--------------------------------------------------------------------------------------------------------------------------------------
function snakeGameplay(direction) {                                                                 // Core mechanic of the game
    if (direction == "ArrowUp") snake.unshift({ x: snake[0].x - 1, y: snake[0].y });                // Move snake object UP
    if (direction == "ArrowDown") snake.unshift({ x: snake[0].x + 1, y: snake[0].y });              // Move snake object DOWN
    if (direction == "ArrowRight") snake.unshift({ x: snake[0].x, y: snake[0].y + 1 });             // Move snake object RIGHT
    if (direction == "ArrowLeft") snake.unshift({ x: snake[0].x, y: snake[0].y - 1 });              // Move snake object LEFT
    collision();                                                                                    // Calling 'collision' function
    if (gameON) {
        drawSnake();                                                                                // Calling 'drawSnake' function if no collision has occured
        if (foodLocation[0].x == snake[0].x && foodLocation[0].y == snake[0].y) {                   // If the food has been eaten
            generateFood();                                                                         // Calling 'generateFood' function
            score();                                                                                // Calling 'score' function
            speed();                                                                                // Calling 'speed' function
        } else {
            removeTail();                                                                           // Remove last element from snake object
        }
    }
}
//------------------------------------------------------------------COLLISION FUNCTION-------------------------------------------------------------------------------------------------------------------------------------------
function collision() {                                                                              // Checks to see if the snake object has hit one of the walls or himself
    // --> Top side & Bottom side & Left side & Right side collision
    if (snake[0].x == -1 || snake[0].x == 25 || snake[0].y == -1 || snake[0].y == 25) {
        clearInterval(movement);
        gameON = false;
    }
    // --> Collision with self
    for (let i = 1; i < snake.length; ++i) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(movement);
            gameON = false;
        }
    }
}
//------------------------------------------------------------------REMOVE TAIL FUNCTION---------------------------------------------------------------------------------------------------------------------------------------- 
function removeTail() {                                                                             // Removes the last element from the snake object
    grid[snake[snake.length - 1].x][snake[snake.length - 1].y].style.backgroundColor = 'gainsboro';
    snake.pop();
}
//------------------------------------------------------------------SCORE FUNCTION-----------------------------------------------------------------------------------------------------------------------------------------------
function score() {                                                                                  // Keeps track of the score
    gameScore.textContent = `Score ${++inGameScore}`;                                               
}
//------------------------------------------------------------------SPEED FUNCTION-----------------------------------------------------------------------------------------------------------------------------------------------
function speed() {                                                                                  // Increases speed everytime you acquire 125 points
    if (inGameScore % 125 == 0) interval -= 10;
}
