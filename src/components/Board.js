Crafty.c('Board', {
  required: '2D, Canvas',
  at: function(pos_x, pos_y) {
      this.x = 1;
        this.board = []
        let types = ['blackCell', 'whiteCell']
        for (let i = 0; i < boardSize; i++) {
            this.board.push([])
            for (let j = 0; j < boardSize; j++) {
                this.board[i].push(
                    Crafty.e('2D, Canvas, Color')
                        .attr({
                            x: pos_x + j * cellSize,
                            y: pos_y + i * cellSize,
                            h: cellSize,
                            w: cellSize 
                        })
                        .color(themes[types[(i + j) % 2]])
                )
            }
        }
        return this
    }   
})