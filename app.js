var origBoard;
const huPlayer = "X";
const aiPlayer = "O";
//these are all the possible win combos for the game//
const winCombos = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
]
//cells store a refrence each cell//
//query selector all is  element on the page that has the class of cell// 
const cells = document.querySelectorAll('.cell');
startGame();
function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}
//the cell is being identified by a click of the human player//
function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
//check tie//
    }
    turn(square.target.id, huPlayer)
    if (!checkTie()) turn(bestSpot(), aiPlayer);
    
}
//
function turn(squareId, player){
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}
// 
function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => 
      (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
       if (win.every(elem => plays.indexOf(elem) > -1)) {
         gameWon = {index: index, player: player};
         break;
       }
    } 
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor
        gameWon.player == huPlayer ?'blue' : 'red';
    }
    for (var i = 0; i < cells.length; i++){
        console.log(cells[i]);
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == huPlayer ? 'You Win!' : "You Lose.");
}

function declareWinner(who){
    document.querySelector('.endgame').style.display = "block"
    document.querySelector('.endgame .text').innerText = who;
}
function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}
function bestSpot() {
    return emptySquares()[0];
}
function checkTie() {
    if (emptySquares().length == 0) {
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = 'orange';
        cells[i].removeEventListener('click', turnClick, false );
       }
        declareWinner('Tie Game!')
        return true;
    }
    return false;
}
a = document.querySelectorAll('cell')
a.forEach(function(e){
    e.addEventListener('click', function(e) {
        e.innerHTML = "X"
    })
})