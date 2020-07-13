const themes = {
    whiteCell: 'rgb(242, 215, 160)',
    blackCell: 'rgb(140, 101, 68)',
    whiteCheck: 'rgb(255, 255, 255)',
    blackCheck: 'rgb(0, 0, 0)',

    interfaceBack: 'rgb(100, 0, 0)',
    interfaceMain: 'rgb(255, 255, 255)'
}

const gameWidth = 1200, gameHeight = 1200

let boardSize = 10
const cellSize = 75
let boardStartPosX = (gameWidth - boardSize * cellSize) / 2, boardStartPosY = 100

let gameModes = [10, 8]
let nowGameMode = 0
 
let selectedCheck = []
let canGoCells = []

let checks = []
let continueTurn = false

