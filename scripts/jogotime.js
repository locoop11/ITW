"use strict";

let tempoDecorrido = 0;
let intervalo;
let countdown;

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const endButton = document.getElementById('endButton');
    const timeLimitInput = document.getElementById('timeLimitInput');

    startButton.addEventListener('click', function() {
        const timeLimit = parseInt(timeLimitInput.value, 10); // Obter o tempo limite do campo de entrada

        localStorage.setItem('definedTime', timeLimit);
        startButton.disabled = true; // Desativar o botão de começar após iniciar o jogo
        endButton.disabled = false; // Ativar o botão de terminar
        iniciarContagemRegressiva(timeLimit); // Iniciar a contagem regressiva com o tempo configurado
        generateTable();
    });
});

function iniciarContagemRegressiva(timeLimit) {
    let tempoRestante = timeLimit; // Usar o tempo limite configurado
    document.getElementById('tempo').innerText = tempoRestante;
    countdown = setInterval(function() {
        tempoRestante--;
        document.getElementById('tempo').innerText = tempoRestante;
        if (tempoRestante <= 0) {
            clearInterval(countdown);
            terminarJogo();
        }
    }, 1000);
}

function terminarJogo() {
    clearInterval(intervalo);
    clearInterval(countdown);
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

    const gameBoard1 = document.getElementById('game-board');
    gameBoard1.innerHTML = '';

    // Create an array of 10 unique cards
    let cards = [
        new Card('Card 1', 'media/capacarta.jpg', 'media/cao.png'),
        new Card('Card 2', 'media/capacarta.jpg', 'media/gato.jpg'),
        new Card('Card 3', 'media/capacarta.jpg', 'media/girafa.png'),
        new Card('Card 4', 'media/capacarta.jpg', 'media/vaca.png'),
        new Card('Card 5', 'media/capacarta.jpg', 'media/urso.jpg'),
        new Card('Card 6', 'media/capacarta.jpg', 'media/leao.jpg'),
        new Card('Card 7', 'media/capacarta.jpg', 'media/rato.png'),
        new Card('Card 8', 'media/capacarta.jpg', 'media/sapo.jpg'),
        new Card('Card 9', 'media/capacarta.jpg', 'media/golfinho.jpg'),
        new Card('Card 10', 'media/capacarta.jpg', 'media/abelha.jpg'),
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

    function updateScores(){
        document.getElementById("player1-score").textContent = `Player 1: ${player1Score}`
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
                
                if (firstCard === secondCard){
                    
                    alert("Nao podes escolher a mesma carta duas vezes!")
                    firstCard.src = cards.find(card => card.name === firstCard.dataset.name).imagePathDown;
                    secondCard.src = cards.find(card => card.name === secondCard.dataset.name).imagePathDown;
                    firstCard = null;
                    secondCard = null;

                }


                // Check if the two cards match
                if (firstCard.dataset.name === secondCard.dataset.name) {
                    // They match, so keep them face up
                        player1Score += 1
                    updateScores()
                    preventClick = true;
                    if (player1Score === 10) {
                        alert("Parabens! Ganhou o jogo!")
                        window.location.href = "Home.html";
                    }
                    setTimeout(() => {
                        // They match, so remove the matched cards from the table
                        firstCard.parentNode.removeChild(firstCard);
                        secondCard.parentNode.removeChild(secondCard);
                        firstCard = null;
                        secondCard = null;
                        preventClick = false;
                    }, 1000); // 1 second delay


                } else {
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

    gameBoard1.appendChild(table);
}