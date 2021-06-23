// Global variables
let numbers = [1, 2, 1, 2, 3, 4, 3, 4, 5, 6, 5, 6, 7, 8, 7, 8];
let matches = 0;
let pause = false;
let clickedButtonId = undefined;
let clickedButtonNumber = undefined;
let playAgainBtn = document.querySelector("#play-again");
let gameButtons = document.querySelectorAll(".game-button");

spreadNumbersToButtons(); // Function for assigning unique values to game buttons data attribute in DOM
playAgainBtn.addEventListener('click', resetGame);

// Function for game buttons
for (i = 0; i < gameButtons.length; i++) {
    gameButtons[i].addEventListener('click', function (e) {
        let turnable = e.target.dataset.turnable;

        // 1st click
        if (!pause && clickedButtonId == undefined && clickedButtonNumber == undefined && turnable == 'true') {
                e.target.dataset.turnable = 'false';
                
                e.target.textContent = e.target.dataset.number;
                e.target.style.backgroundColor = 'cyan';

                clickedButtonId = e.target.id;
                clickedButtonNumber = e.target.dataset.number;
        }

        // 2nd click  
        if (!pause && clickedButtonId != undefined && clickedButtonNumber != undefined && turnable == 'true' && e.target.id != clickedButtonId) {
                e.target.dataset.turnable = 'false';
                e.target.textContent = e.target.dataset.number;
             
                // If pair
                if (e.target.dataset.number == clickedButtonNumber) {
                    e.target.style.backgroundColor = 'green';
                    document.getElementById(clickedButtonId).style.backgroundColor = 'green';

                    clickedButtonId = undefined;
                    clickedButtonNumber = undefined;
                    
                    matches++;

                   // Reset matches to 0 if matches got up to 8
                    if (matches == 8) {
                        alert ("Game over"); 
                        matches = 0;
                    }
                                            
                 // If no pair   
                } else {
                    document.getElementById(clickedButtonId).style.backgroundColor = 'red';
                    e.target.style.backgroundColor = 'red';
                    pause = true;

                    setTimeout (() => {
                        e.target.dataset.turnable = 'true';
                        e.target.style.backgroundColor = 'indigo';
                        e.target.textContent = "";

                        let pausedButton = document.getElementById(clickedButtonId);

                        pausedButton.dataset.turnable = 'true';
                        pausedButton.style.backgroundColor = 'indigo';
                        pausedButton.textContent = "";

                        clickedButtonId = undefined;
                        clickedButtonNumber = undefined;
                        pause = false;
                    }, 700);
                }
            } 
    });
}

function resetGame() {    
        for (i = 0; i < gameButtons.length; i++) {
            gameButtons[i].dataset.turnable = 'true';
            gameButtons[i].style.backgroundColor = 'indigo';
            gameButtons[i].textContent = "";
    }
}
            
function spreadNumbersToButtons() {
        // Loop counters (i) change with each iteration, providing a unique value for each individual iteration.
        // There are 16 button elements stored in 'gameButtons' variable & 16 integers stored in 'numbers' variable.
    for (i = 0; i < gameButtons.length; i++) { 
        // 1. Get 'numbers' variable (array of integers).
        // 2. From that array, index inside with the unique current value that iteration has (i).
        // 3. Set this value to button element data attribute.
        gameButtons[i].dataset.number = numbers[i];
        // Every game button should get unique number assigned to it's data attribute via this for-loop. 
    }
}