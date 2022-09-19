'use strict'
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let directionUP = false;                                                                            // Boolean value for UP Direction
let directionDOWN = false;                                                                          // Boolean value for DOWN Direction
let directionRIGHT = true;                                                                          // Boolean value for RIGHT Direction, snake can go UP, DOWN or RIGHT never LEFT at the beggining of the game
let directionLEFT = false;                                                                          // Boolean value for LEFT Direction
let gameON = true;                                                                                  // Boolean value for GAME State
let interval = 100;                                                                                 // The speed at which the snake travels
let movement;                                                                                       // Creating variable for setInterval function    
let foodLocation;                                                                                   // Creating variable for food location;     
let snake = [506, 505, 504, 503];                                                                   // Creating snake object
let gameScore = document.getElementById('score');                                                   // Creating score object
const gameContainer = document.getElementById('main');                                              // Creating game container object
const resetBtn = document.getElementById('restart_btn');                                            // Creating reset button object
//------------------------------------------------------------------GENERATIN GAME MAP-------------------------------------------------------------------------------------------------------------------------------------
for (let i = 0; i < 625; ++i) {                                                                     // Game map will have a total of 625 units
    gameContainer.innerHTML += `<div class="unit ${i}"> </div>`;                                    // Each unit will be given a class name and number
}

const gameBoard = document.querySelectorAll('.unit');                                               // Creating game board object
drawSnake();                                                                                        // Calling draw snake function
foodLocation = generateFood();                                                                      // Calling generate food function and saving the food location
//------------------------------------------------------------------GAME MECHANIC--------------------------------------------------------------------------------------------------------------------------------------------
function drawSnake() {                                                                              // Creating draw snake function
    for (let i = 0; i < snake.length; ++i) {                                                        // Going throw each element of the snake array
        for (let j = 0; j < gameBoard.length; ++j) {                                                // Going throw each game board unit 
            if (snake[i] == j) {                                                                    // If the snake index value is equal to the unit value
                gameBoard[snake[i]].style.backgroundColor = 'black';                                // That respective unit will be colored in black and it will represent the snake
            }
        }
    }

    collision();                                                                                    // Calling the collision function
    //-----------------------------------------------------------------SNAKE SIZE------------------------------------------------------------------------------------------------------------------------------------------
    if (foodLocation != snake[0]) {                                                                 // If the food location has a different value than the snake's head                                             
        gameBoard[snake[snake.length - 1]].style.backgroundColor = 'gainsboro';                     // The last element from the snake array will change its color to the same color as the background
        snake.pop();                                                                                // The last element from the snake array will be removed
    } else {                                                                                        // But if the food location value is equal to the snake's head the pop method and recoloring of the tail will be skiped
        foodLocation = generateFood();                                                              // The generate food function will be called and its new value will be saved in the food location variable
        score();                                                                                    // The score function is called to increase and update the game score
        speed();                                                                                    // Calling the speed function                 
    }
}
//------------------------------------------------------------------DIRECTION FUNCTIONS--------------------------------------------------------------------------------------------------------------------------------------
function goingUP() {                                                                                // Creating a going UP function
    snake.unshift(snake[0] - 25);                                                                   // Going UP requires we deduct 25 in order to travel UP one unit
    drawSnake();                                                                                    // Calling the draw snake function
}

function goingDOWN() {                                                                              // Creating going DOWN function 
    snake.unshift(snake[0] + 25);                                                                   // Going DOWN requires we add 25 in order to travel DOWN one unit    
    drawSnake();                                                                                    // Calling the draw snake function
}

function goingRIGHT() {                                                                             // Creating going RIGHT function
    snake.unshift(snake[0] + 1);                                                                    // Going RIGHT requires we add 1 in order to travel RIGHT one unit
    drawSnake();                                                                                    // Calling the draw snake function
}

function goingLEFT() {                                                                              // Creating going LEFT function
    snake.unshift(snake[0] - 1);                                                                    // Going LEFT requires we deduct 1 in order to travel LEFT one unit
    drawSnake();                                                                                    // Calling draw snake function 
}
//-----------------------------------------------------------------GENERATE FOOD-----------------------------------------------------------------------------------------------------------------------------------------------
function generateFood() {                                                                           // Creating generate food function

    let foodPosition = Math.floor(Math.random() * (624 - 0 + 1) + 0);                               // Generates a random number between 0 and 624
    let index = snake.indexOf(foodPosition);                                                        // Cheking the random number to not be in the snake array

    if (index == -1) {                                                                              // If the generated number is not in the array then the index will be equal to -1
        gameBoard[foodPosition].style.backgroundColor = 'red';                                      // Coloring the valid pozition         
        return foodPosition;                                                                        // Returning the pozition of the food
    } else {                                                                                        // In case the position is ocupied by the snake's body
        return generateFood();                                                                      // Returning the current function to search for a new valid position
    }
}
//-----------------------------------------------------------------SCORE-------------------------------------------------------------------------------------------------------------------------------------------------------
function score() {                                                                                  // Creating score function

    let snakeOriginalLength = 3;                                                                    // Setting snake's original length
    let snakeNewLength = snake.length                                                               // Setting snake's new length

    gameScore.textContent = `Score ${snakeNewLength - snakeOriginalLength}`;                        // Updating the score in HTML based on the difference between the snake's new and original length

    return snakeNewLength - snakeOriginalLength;                                                    // Return score
}
//-----------------------------------------------------------------COLLISION---------------------------------------------------------------------------------------------------------------------------------------------------
function collision() {                                                                              // Creating collision function

    if (snake[0] < 0) {                                                                             // If the snake's head has a value lower than 0, then it's out of bounds from the top side
        clearInterval(movement);                                                                    // The movement of the snake will be stoped
        gameON = false;                                                                             // The game will end
    }

    if (snake[0] > 624) {                                                                           // If the snake's head has a value greated than the total units of the map, then it's out of bounds from the bottom side
        clearInterval(movement);                                                                    // The movement of the snake will be stoped
        gameON = false;                                                                             // The game will end
    }

    for (let i = 24; i < 624; i += 25) {                                                            // Going throw each edge on the right side 
        if (snake[0] == i + 1 && snake[1] == i || snake[0] == i && snake[1] == i + 1) {             // If the first two element of the snake array are equal to the left of right edge, then it's out of bounds
            gameBoard[snake[0]].style.backgroundColor = 'gainsboro';                                // Changing snake's head color so that it will not come out from out of bounds                
            clearInterval(movement);                                                                // The movement of the snake will be stopped 
            gameON = false;                                                                         // The game will end
        }
    }

    for (let i = 1; i < snake.length; ++i) {                                                        // Going throw each element of the snake 
        if (snake[0] == snake[i]) {                                                                 // If the snake's head is equal to any other element of the snake array, then it has collided with itself
            gameBoard[snake[0]].style.backgroundColor = 'black';
            clearInterval(movement);                                                                // The movement of the snake will be stopped
            gameON = false;                                                                         // The game will end;
        }
    }
}
//-----------------------------------------------------------------SPEED-------------------------------------------------------------------------------------------------------------------------------------------------------
function speed() {                                                                                  // Creating speed function
    if (score() % 125 == 0) {                                                                       // If the score can be divided by 125;
        interval -= 10;                                                                             // The speed interval increases by 10 milliseconds
    }
}
//-----------------------------------------------------------------KEY PRESSED-------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('keydown', function (key) {                                               // Creating an event listener to identify which key was pressed

    if (gameON) {                                                                                   // If the "gameON" variable remains TRUE the snake will be allowed to move
        if (key.code == "ArrowUp" && directionDOWN == false) {                                      // If the key pressed is "ArrowUp" and the boolean value of "directionDOWN" is false
            clearInterval(movement);                                                                // This will stop the current traveling dirrection of the snake
            directionUP = true;                                                                     // Since the direction is UP, the boolean value changes
            directionDOWN = false;                                                                  // Boolean value stays the same
            directionRIGHT = false;                                                                 // Boolean value stays the same
            directionLEFT = false;                                                                  // Boolean value stays the same
            movement = setInterval(goingUP, interval);                                              // The snake will only be allowed to move UP, LFTT or RIGHT 
        } else if (key.code == "ArrowDown" && directionUP == false) {                               // If the key pressed is "ArrowDown" and the boolean value of "directionUP" is false
            clearInterval(movement);                                                                // This will stop the current traveling dirrection of the snake
            directionUP = false;                                                                    // Changed boolean value back
            directionDOWN = true;                                                                   // Since the direction in DOWN, the boolean value changes
            directionRIGHT = false;                                                                 // Boolean value stays the same
            directionLEFT = false;                                                                  // Boolean value stays the same
            movement = setInterval(goingDOWN, interval);                                            // The snake will only be allowed to move DOWN, LFTT or RIGHT
        } else if (key.code == "ArrowRight" && directionLEFT == false) {                            // If the key pressed is "ArrowRight" and the boolean value of "directionLEFT" is false
            clearInterval(movement);                                                                // This will stop the current traveling dirrection of the snake
            directionUP = false;                                                                    // Boolean value stays the same
            directionDOWN = false;                                                                  // Changed boolean value back
            directionRIGHT = true;                                                                  // Since the direction is RIGHT, the boolean value changes
            directionLEFT = false;                                                                  // Boolean value stays the same
            movement = setInterval(goingRIGHT, interval);                                           // The snake will only be allowed to move UP, DOWN or RIGHT
        } else if (key.code == "ArrowLeft" && directionRIGHT == false) {                            // If the key pressed is "ArrowLEFT" and the boolean value of "directionRIGHT" is false
            clearInterval(movement);                                                                // This will stop the current traveling dirrection of the snake    
            directionUP = false;                                                                    // Boolean value stays the same
            directionDOWN = false;                                                                  // Boolean value stays the same
            directionRIGHT = false;                                                                 // Changed boolean value back
            directionLEFT = true;                                                                   // Since the directions is LEFT, the boolean value changes
            movement = setInterval(goingLEFT, interval);                                            // The snake will only be allowed to move UP, DOWN or LEFT
        }
    }
});
//-----------------------------------------------------------------RESET GAME---------------------------------------------------------------------------------------------------------------------------------------------------
resetBtn.addEventListener('click', function () {                                                    // Adding functionalitii to the PLAY AGAIN button
    location.reload();                                                                              // Reloads the page and sets everything back
})
