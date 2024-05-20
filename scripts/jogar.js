"use strict"

let tempoDecorrido = 0;
let intervalo;

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const endButton = document.getElementById('endButton');

    startButton.addEventListener('click', function() {
        startButton.disabled = true; // Desativa o botão de começar após iniciar o jogo
        endButton.disabled = false; // Ativa o botão de terminar
        iniciarCronometro();
    });
});

function iniciarCronometro() {
    intervalo = setInterval(function() {
        tempoDecorrido++;
        document.getElementById('tempo').innerText = tempoDecorrido;
    }, 1000);
}

function terminarJogo() {
    clearInterval(intervalo);
    alert("Jogo terminado!");
    window.location.href = "Home.html";
}



// Define the Card class
class Card {
    constructor(name, imagePathDown, imagePathUp) {
        this.name = name;
        this.imagePathDown = imagePathDown;
        this.imagePathUp = imagePathUp;
    }
}

function generateTable() {
    // Create an array of 10 unique cards
    let cards = [
        new Card('Card 1', 'media/capacarta.jpg', 'images/card1-up.png'),
        new Card('Card 2', 'media/capacarta.jpg', 'images/card2-up.png'),
        new Card('Card 3', 'media/capacarta.jpg', 'images/card3-up.png'),
        new Card('Card 4', 'media/capacarta.jpg', 'images/card4-up.png'),
        new Card('Card 5', 'media/capacarta.jpg', 'images/card5-up.png'),
        new Card('Card 6', 'media/capacarta.jpg', 'images/card6-up.png'),
        new Card('Card 7', 'media/capacarta.jpg', 'images/card7-up.png'),
        new Card('Card 8', 'media/capacarta.jpg', 'images/card8-up.png'),
        new Card('Card 9', 'media/capacarta.jpg', 'images/card9-up.png'),
        new Card('Card 10', 'media/capacarta.jpg', 'images/card10-up.png')
    ];

    if (cards.length !== 10) {
        throw new Error('You should have 10 unique cards');
    }

    // Duplicate the cards array to get pairs of each card
    cards = cards.concat(cards);

    // Shuffle the cards
    cards.sort(() => Math.random() - 0.5);

    // Define the number of rows and columns for the table
    const numRows = 5;
    const numCols = 4;

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Generate table rows and cells
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement('td');
            const currentCard = cards[i * numCols + j];

            const img = document.createElement('img');
            img.src = currentCard.imagePathDown;
            img.alt = currentCard.name;
            img.dataset.name = currentCard.name; // Store the card name in a data attribute

            cell.appendChild(img);
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);

    let firstCard = null;
    let secondCard = null;
    let preventClick = false;

    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = 1;

    function updateScores(){
        document.getElementById("player1-score").textContent = `Player 1: ${player1Score}`
        document.getElementById("player2-score").textContent = `Player 2: ${player2Score}`
        document.getElementById("current-player").textContent = `Current Player: Player: ${currentPlayer}`
    }


    // Add a listener on the table to rotate the cards face up
    table.addEventListener('click', function(event) {
        if (preventClick) return;

        if (event.target.tagName === 'IMG') {
            const img = event.target;

            // If the card is already face up, ignore the click
            if (img.src.includes('up')) return;

            if (!firstCard) {
                firstCard = img;
                img.src = cards.find(card => card.name === img.dataset.name).imagePathUp;
            } else if (!secondCard) {
                secondCard = img;
                img.src = cards.find(card => card.name === img.dataset.name).imagePathUp;

                // Check if the two cards match
                if (firstCard.dataset.name === secondCard.dataset.name) {
                    // They match, so keep them face up
                    if (currentPlayer === 1)
                        player1Score += 1
                    if (currentPlayer === 2)
                        player2Score += 1
                    updateScores()
                    firstCard = null;
                    secondCard = null;


                } else {
                    // They don't match, so turn them back face down after a short delay
                    if (currentPlayer === 1)
                        currentPlayer = 2
                    else
                        currentPlayer = 1
                    updateScores()
                    preventClick = true;
                    setTimeout(() => {
                        firstCard.src = cards.find(card => card.name === firstCard.dataset.name).imagePathDown;
                        secondCard.src = cards.find(card => card.name === secondCard.dataset.name).imagePathDown;
                        firstCard = null;
                        secondCard = null;
                        preventClick = false;
                    }, 1000); // 1 second delay
                }
            }
        }
    });

    // Check if the element with id 'game-board' exists
    const gameBoard = document.getElementById('game-board');
    if (gameBoard) {
        gameBoard.appendChild(table);
    } else {
        console.error("Element with id 'game-board' not found.");
    }
}

// Call generateTable when the window loads
window.onload = function() {
    generateTable();
};
