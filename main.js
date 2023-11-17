window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    'Mitski',
    'Radiohead',
    'Jeff Buckley',
    'The Sundays',
    'King Krule',
    'The Beatles',
    'Frank Ocean',
    'The Smiths',
    'Blur',
    'The Cranberries',
    'Alex G',
    'Duster',
    'Lamp',
    'Beach House'
];

// Initialize Game
function init() {
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(words);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
    if(matchWords()) {
        isPLaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
        const gifContainer = document.getElementById('gif-container');
        gifContainer.innerHTML = '';
    }

    // If score is -1, display 0
    if(score === -1) {
      scoreDisplay.innerHTML = 0;
    } else {
      scoreDisplay.innerHTML = score;
    }
}

// Match currentWord to wordInput
function matchWords() {
    if(wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }

}

// Pick & show random word
function showWord(words) {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
    // Make sure time is not run out
    if(time > 0) {
        // Decrement
        time--;
    } else if(time === 0) {
        //Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if(!isPlaying && time === 0 ) {
        message.innerHTML = 'Game Over!'
        score = -1;
        displayGIF()
    }
}

function displayGIF() {
        const gifContainer = document.getElementById('gif-container');

        gifContainer.innerHTML = '';

        if (gifContainer.querySelector('img')) {
            return;
        }

        // Gets GIF File
        const gifImage = document.createElement('img');
        gifImage.src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2locHVoemtqNm40cGI2bXN2eHZhcDRnMnV2ejN1MzlqN3UwNDJlciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11xK2fJqk1oJiw/giphy.gif';
        gifImage.alt = 'Congratulations GIF';

        // Sets dimensons for GIF
        gifImage.style.width = '500px'; 
        gifImage.style.height = 'auto'; 

        // Append the image to the gif-container
        gifContainer.appendChild(gifImage);

}