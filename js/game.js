'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPER_POWER = '💥'
const SUPER_FOOD = '🍒'


var gBoard;
var gSuperFoodInterval

var gGame = {
    score: 0,
    isOn: false,
    isWon: false,
    isSuper: false,
    food: 56
}

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    // createSuperFood()
    gSuperFoodInterval=setInterval(createSuperFood,7000)
    gGame.isOn = true

}

function buildBoard() {
    const SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === SIZE -2 ||i === 1 && j === 1||i === SIZE -2 && j === 1 ||i === SIZE -2 && j === SIZE -2){ 
                board[i][j] = SUPER_POWER
            }
        }
    }

    return board;
}

function createSuperFood(){
    
    var foodCells = findCells(gBoard,EMPTY)
    if (foodCells.length === 0) return
    var idx = getRandomInt(0,foodCells.length)
    var foodCellCoord = foodCells[idx]
    console.log('food' , foodCellCoord);
    // update Model 
    gBoard[foodCellCoord.i][foodCellCoord.j] = SUPER_FOOD
    // update DOM
    renderCell(foodCellCoord,SUPER_FOOD)
    

}
function updateScore(diff) {
    // DONE: update model and dom

    // Model
    gGame.score += diff
    //DOM
    document.querySelector('h2 span').innerText = gGame.score
}

function startSuper(){
    gGame.isSuper = true
    setTimeout(function(){
        resetGhosts()
        gGame.isSuper = false
    },5000)
}

function gameOver() {
    gGame.isOn = false
    showModal()
    clearInterval(gIntervalGhosts)
    clearInterval(gSuperFoodInterval)    
    renderCell(gPacman.location, '💀')
}

function showModal() {
    var elModal = document.querySelector('.modal')
    var elModalSpan = elModal.querySelector('.modal span')
    elModalSpan.innerText = (gGame.isWon) ? 'Good job you Won!' : 'You lost!'
    elModal.style.display = 'block'
}

function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none' //why initial isn't working here. ----------------- 
}

function checkVictory() {
    
    if (!findCells(gBoard,FOOD)) {
        gGame.isWon = true
        gameOver()
    }
}

function resetGame() {
    gGame = {
        score: 0,
        isOn: false,
        isWon: false,
        food: 60
    }
    init()
    closeModal()
}