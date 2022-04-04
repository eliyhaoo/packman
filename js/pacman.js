'use strict'
const PACMAN = '😷';
const PAC_RIGHT_IMG = '<img src="img/pac_right.png" alt=""></img>'
const PAC_LEFT_IMG = '<img src="img/pac_left.png" alt=""></img>'
const PAC_UP_IMG = '<img src="img/pac_up.png" alt=""></img>'
const PAC_DOWN_IMG = '<img src="img/pac_down.png" alt=""></img>'

var gPacManImg
var gPacman;
function createPacman(board) {
    // DONE
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    // DONE: use getNextLocation(), nextCell
    if (!gGame.isOn) return
    var nextLocation = getNextLocation(ev.key)
    if (!nextLocation) return
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
   


    // DONE: return if cannot move
    if (nextCell === WALL) return
    // DONE: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (!gGame.isSuper){
            gameOver()
            return
        } else {
            removeGhost(nextLocation)
        }
    }

    checkVictory()
    if (nextCell === FOOD) {
        updateScore(1)
        gGame.food -= 1
        checkVictory()
        console.log('food',gGame.food)
    }

    if (nextCell === SUPER_FOOD) {
        updateScore(10)
        // checkVictory()
        console.log('food',gGame.food)
    }

    if (nextCell === SUPER_POWER) {
        if (gGame.isSuper) return
        startSuper()
        checkVictory()
       
    }

    // DONE: moving from current position:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    
    // DONE: Move the pacman to new location
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // DONE: update the DOM
    renderCell(gPacman.location,gPacManImg)
}


function getNextLocation(eventKey) {
    // DONE: figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKey) {
        case 'ArrowUp':
            nextLocation.i--
            gPacManImg = PAC_UP_IMG
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacManImg = PAC_RIGHT_IMG
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacManImg = PAC_DOWN_IMG
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacManImg = PAC_LEFT_IMG
            break;

        default:
            return null;
    }

    return nextLocation;
}