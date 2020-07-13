function clean() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            checks[i][j].destroy()
        }
    }
    checks = []
}

function draw() {
    eng.calcCanSelect()
    for (let i = 0; i < boardSize; i++) {
        checks.push([])
        for (let j = 0; j < boardSize; j++) {
            if (map[i][j].type != 0) {
                checks[i].push(
                    Crafty.e('Check')
                        .at(i, j, map[i][j].type - 1, map[i][j].isKing)
                )
            }
            else {
                checks[i].push(Crafty.e('Canvas, 2D'))
            }
        }
    }
    console.log(selectedCheck)
    if (selectedCheck.length != 0) {
        checks[selectedCheck[0]][selectedCheck[1]].select()
    }
}

Crafty.scene('game', function() {
    console.log(boardSize)
    Crafty.init(gameWidth, gameHeight)
    Crafty.background('black')
    Crafty.e('Board')
        .at(boardStartPosX, boardStartPosY)
    eng.init()
    draw()
    // console.log(checks)
})