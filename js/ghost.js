'use strict'
const GHOST = '&#9781;';
var gGhosts = []
var gIntervalGhosts;
var gRemovedGhosts = []


function createGhost(board) {
    // DONE
    var ghost = {
        location: {
            i: 3,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor(),
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost)


}


function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}


function moveGhosts() {
    // DONE: loop through ghosts
    // console.log('hey im moving!!!!');
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        // console.log('ghost beforeee', ghost)
        moveGhost(ghost)

    }
}


function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    
    

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        if (!gGame.isSuper)  gameOver()
           return
        
    }

    // DONE: moving from current position:
    // DONE: update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // DONE: Move the ghost to new location
    // DONE: update the model
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost),) //didn't understand what is this
}

function removeGhost(coords) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (coords.i === ghost.location.i && coords.j === ghost.location.j) {
            var removedGhost = gGhosts.splice(i, 1)
            gRemovedGhosts.push(...removedGhost)
           if (gBoard[ghost.location.i][ghost.location.j] === ghost.currCellContent) gGame.food -= 1
          
        }
    }
    
}

function resetGhosts(){
    clearInterval(gIntervalGhosts)

    for (var i = 0 ; i < gRemovedGhosts.length ; i++){
        gGhosts.push(gRemovedGhosts[i])
    }
    gRemovedGhosts= []
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function getMoveDiff() {

    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    var color = (!gGame.isSuper) ? ghost.color : 'blue'
    return `<span style="color:${color}">${GHOST}</span>`
}

