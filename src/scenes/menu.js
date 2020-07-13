Crafty.defineScene('menu', function() {
    Crafty.init(gameWidth, gameHeight)
    Crafty.background(themes['blackCheck']);

    let title = Crafty.e('Title')
        .title({
            text: 'Checkers',
            textSize: 50,
            y: 100
        })
        

    let start = Crafty.e('Button')
        .bind('Click', function(MouseEvent){
            nowLevel = 0
            Crafty.scene('game');
        })
    start.newPos(gameWidth / 2 - start.w / 2, 200)
    start.addText('Start')

    let settings = Crafty.e('Button')
        .bind('Click', function(MouseEvent){
            Crafty.scene('settings');
        })
    settings.newPos(gameWidth / 2 - settings.w / 2, 300)
    settings.addText('Settings')

    let leaderboard = Crafty.e('Button')
        .bind('Click', function(MouseEvent){
            Crafty.scene('Leaderboard');
        })
    leaderboard.newPos(gameWidth / 2 - leaderboard.w / 2, 400)
    leaderboard.addText('Leaderboard')

    let levelSelect = Crafty.e('Button')
        .bind('Click', function(MouseEvent){
            Crafty.scene('LevelSelect');
        })
    levelSelect.newPos(gameWidth / 2 - levelSelect.w / 2, 500)
    levelSelect.addText('Select level')
})