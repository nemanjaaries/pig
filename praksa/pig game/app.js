/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

    var scores, currentScore, activePlayer, dice, dice2, previousDice, gameActive;
    
    init();

    document.querySelector('.btn-roll').addEventListener('click', function(){
        if(gameActive){
            dice = Math.round(Math.random() * 5 + 1);
            //dice2 = Math.floor(Math.random() * 5 + 1);
            console.log(dice, dice2);
            document.querySelector('.dice').style.display = 'block';
            document.querySelector('.dice').src = 'dice-' + dice + '.png';
            //document.querySelector('.dice-2').style.display = 'block';
            //document.querySelector('.dice-2').src = 'dice-' + dice2 + '.png';
            if(dice !== 1){         //&& dice2 !==1
                if(previousDice === 6 && dice === 6){
                    scores[activePlayer] = 0;
                    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                    nextPlayer();
                }else{
                    currentScore += (dice);// dice2
                    document.getElementById('current-' + activePlayer).textContent = currentScore;
                }
    
            }else{
                nextPlayer();
            }

            previousDice = dice;
        }
        
    });

    document.querySelector('.btn-hold').addEventListener('click', function(){
        if(gameActive){
            scores[activePlayer] += currentScore;

            document.getElementById('score-0').textContent = scores[0];
            document.getElementById('score-1').textContent = scores[1];

            if(scores[activePlayer] >= 100){
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                document.getElementById('name-' + activePlayer).textContent = 'Winner!!!';
                document.querySelector('.dice').style.display = 'none';
                gameActive = false;
            }else{
                nextPlayer();
            }
        }
        
    });

    document.querySelector('.btn-new').addEventListener('click', init);


    function init(){
        scores = [0, 0];
        activePlayer = 0;
        currentScore = 0;
        dice = 0;
        gameActive = true;
        previousDice = 0;

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.add('active');
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';
    }

    function nextPlayer(){
        activePlayer = activePlayer === 0? 1: 0;
        currentScore = 0;
        previousDice = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle("active");
        document.querySelector('.player-1-panel').classList.toggle("active");
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';
    }
