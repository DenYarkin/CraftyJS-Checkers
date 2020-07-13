Crafty.defineScene('settings', function() {
    Crafty.init(gameWidth, gameHeight)
    Crafty.background(themes['blackCheck']);

    let title = Crafty.e('Title')
        .title({
            text: 'Settings',
            textSize: 50,
            y: 100
        })
        

    let selectBoardSize = Crafty.e('Button')
        .bind('Click', function(MouseEvent){
            nowGameMode = (nowGameMode + 1) % gameModes.length
            boardSize = gameModes[nowGameMode]
            Crafty.scene('settings');
        })
    selectBoardSize.newPos(gameWidth / 2 - selectBoardSize.w / 2, 200)
    selectBoardSize.addText('Board Size: ' + boardSize)

    let back = Crafty.e('Button')
        .bind('Click', function(MouseEvent){
            Crafty.scene('menu');
        })
    back.newPos(gameWidth / 2 - selectBoardSize.w / 2, 300)
    back.addText('Back')

    
})