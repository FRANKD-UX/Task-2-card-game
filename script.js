document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const movesDisplay = document.getElementById('moves');
    const pairsDisplay = document.getElementById('pairs');
    const winnerMessage = document.getElementById('winner-message');
    const finalMovesDisplay = document.getElementById('final-moves');
    const restartButton = document.getElementById('restart-button');
    const playAgainButton = document.getElementById('play-again-button');
    
    let cards = [];
    let flippedCards = [];
    let moves = 0;
    let pairsFound = 0;
    let canFlip = true;
    
    // Initialize the game
    function initGame() {
        // Reset game state
        cards = [];
        flippedCards = [];
        moves = 0;
        pairsFound = 0;
        canFlip = true;
        
        // Update displays
        movesDisplay.textContent = moves;
        pairsDisplay.textContent = pairsFound;
        
        // Clear the game board
        gameBoard.innerHTML = '';
        
        // Create card pairs (A-H, each letter appears twice)
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const cardValues = [...letters, ...letters];
        
        // Shuffle the cards
        shuffleArray(cardValues);
        
        // Create card elements
        cardValues.forEach((value, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.value = value;
            card.dataset.index = index;
            
            const cardFront = document.createElement('div');
            cardFront.className = 'card-face card-front';
            cardFront.textContent = '?';
            
            const cardBack = document.createElement('div');
            cardBack.className = 'card-face card-back';
            cardBack.textContent = value;
            
            card.appendChild(cardFront);
            card.appendChild(cardBack);
            
            card.addEventListener('click', handleCardClick);
            
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }
    
    // Shuffle array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Handle card click
    function handleCardClick(e) {
        const card = e.currentTarget;
        
        // Prevent flipping if game is locked, card is already flipped, or card is already matched
        if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        // Prevent flipping more than 2 cards
        if (flippedCards.length >= 2) {
            return;
        }
        
        // Flip the card
        card.classList.add('flipped');
        flippedCards.push(card);
        
        // Check for match if two cards are flipped
        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            
            const card1Value = flippedCards[0].dataset.value;
            const card2Value = flippedCards[1].dataset.value;
            
            if (card1Value === card2Value) {
                // Match found
                flippedCards[0].classList.add('matched');
                flippedCards[1].classList.add('matched');
                flippedCards = [];
                
                pairsFound++;
                pairsDisplay.textContent = pairsFound;
                
                // Check for win
                if (pairsFound === 8) {
                    setTimeout(() => {
                        finalMovesDisplay.textContent = moves;
                        winnerMessage.classList.add('show');
                    }, 500);
                }
            } else {
                // No match
                canFlip = false;
                
                setTimeout(() => {
                    flippedCards[0].classList.remove('flipped');
                    flippedCards[1].classList.remove('flipped');
                    flippedCards = [];
                    canFlip = true;
                }, 1000);
            }
        }
    }
    
    // Event listeners for buttons
    restartButton.addEventListener('click', initGame);
    
    playAgainButton.addEventListener('click', () => {
        winnerMessage.classList.remove('show');
        initGame();
    });
    
    // Initialize the game
    initGame();
});
