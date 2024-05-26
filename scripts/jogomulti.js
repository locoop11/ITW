"use strict";

const TOTAL_POINTS = 10; // Defina o número total de pontos necessários para vencer o jogo

let tempoDecorrido = 0;
let intervalo;

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const endButton = document.getElementById('endButton');

    startButton.addEventListener('click', function() {
        startButton.disabled = true; // Desativar o botão de começar após iniciar o jogo
        endButton.disabled = false; // Ativar o botão de terminar
        iniciarCronometro();
        generateTable();
    });
});

function iniciarCronometro() {
    // Reiniciar o cronômetro
    clearInterval(intervalo);
    tempoDecorrido = 0;
    document.getElementById('tempo').innerText = tempoDecorrido;
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
            img.id = String(i * numCols + j + 1);
            img.dataset.name = currentCard.name; // Store the card name in a data attribute

            cell.appendChild(img);
            cell.className = "card-container"
            const p = document.createElement("p")

            p.textContent = String(i * numCols + j + 1)
            cell.appendChild(p)
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
        document.getElementById("current-player").textContent = `Current Player: ${currentPlayer}`
        const remainingPoints = TOTAL_POINTS - (player1Score + player2Score);
        document.getElementById("points-remaining").textContent = `Pontos Restantes: ${remainingPoints}`;
    }

    document.addEventListener('keydown', function(event) {
        let cardIndex = 0;
        if( event.key !== 'Enter' ) {
            cardIndex = parseInt(event.key);
            if( isNaN(cardIndex) ) {
                alert("Invalid card index");
                window.numbInput = null;
                return;
            }
            if( window.numbInput ) {
                window.numbInput += event.key;
            } else {
                window.numbInput = event.key;
            }
        } else {
            cardIndex = parseInt(window.numbInput);
            window.numbInput = null;

            if (!firstCard) {
                let firstCardImage = document.querySelector(`img[id="${cardIndex}"]`);
                if( !firstCardImage ) {
                    alert("Invalid card index");
                    return;
                }
                firstCard = firstCardImage;
                firstCardImage.src = cards.find(card => card.name === firstCardImage.dataset.name).imagePathUp;
            } else if (!secondCard) {
                let secondCardImage = document.querySelector(`img[id="${cardIndex}"]`);
                if( !secondCardImage ) {
                    alert("Invalid card index");
                    return;
                }
                secondCard = secondCardImage;
                secondCardImage.src = cards.find(card => card.name === secondCardImage.dataset.name).imagePathUp;
                
                // Check if the two cards match
                processCardsMatchMulti(firstCard, secondCard);

            }            
        }
    });
    
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
                processCardsMatchMulti(firstCard, secondCard);

            }
        }
    });

    function processCardsMatchMulti(firstCardImagePath, secondCardImagePath) {
        firstCard = firstCardImagePath;
        secondCard = secondCardImagePath;
        if (firstCard === secondCard){
                    
            alert("Nao podes escolher a mesma carta duas vezes!\nPerdeste a vez!")
            // They match, so keep them face up
            if (currentPlayer === 1)
                currentPlayer = 2
            if (currentPlayer === 2)
                currentPlayer = 1
            firstCard.src = cards.find(card => card.name === firstCard.dataset.name).imagePathDown;
            secondCard.src = cards.find(card => card.name === secondCard.dataset.name).imagePathDown;
            firstCard = null;
            secondCard = null;

        }


        // Check if the two cards match
        if (firstCard.dataset.name === secondCard.dataset.name) {
            // They match, so keep them face up
            if (currentPlayer === 1)
                player1Score += 1
            if (currentPlayer === 2)
                player2Score += 1

            updateScores()
            preventClick = true;
            if (player1Score + player2Score === TOTAL_POINTS) {
                if (player1Score > player2Score) {
                    alert("Parabéns, Jogador 1! Você ganhou o jogo!");
                } else if (player2Score > player1Score) {
                    alert("Parabéns, Jogador 2! Você ganhou o jogo!");
                } else {
                    alert("Empate! Ambos os jogadores têm a mesma pontuação.");
                }
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
           
    gameBoard1.appendChild(table);
}