Crafty.c("Check", {
    required: "2D, Canvas, Color, Mouse",
    at: function(i, j, type, isKing) {
        this.checkRadius = cellSize / 2 * 85 / 100
        this.y = i * cellSize + boardStartPosY + (cellSize - 2 * this.checkRadius) / 2
        this.x = j * cellSize + boardStartPosX + (cellSize - 2 * this.checkRadius) / 2
        this.z = 2
        this.h = this.checkRadius * 2
        this.w = this.checkRadius * 2

        this.i = i
        this.j = j

        this.isKing = isKing
        this.type = type
        this.selected = 0

        canGoCells = []
        this.selectedWays = []
        // console.log(this.x, this.y)
        return this
    },
    select: function() {
        if (!canSelect[this.i][this.j]) {
            console.log('111111111')
            return;
        }
        if (this.type === whitesTurn) {
            console.log('2222222222')
            return;
        }
        console.log("SELECT")
        this.selectedWays.forEach(element => {
            element.destroy()
        })
        this.selectedWays = []
        this.selected = 1

        if (selectedCheck.length != 0 && (selectedCheck[0] != this.i || selectedCheck[1] != this.j)) {
            // console.log(checks[selectedCheck[0]][selectedCheck[1]])
            checks[selectedCheck[0]][selectedCheck[1]].unselect()
            this.color('green', 0)
            canGoCells.forEach(element => {
                element.destroy()
            });
            canGoCells = []
        }
        selectedCheck = [this.i, this.j]
        this.color('red')
        let cells = eng.cellsToGo(this.i, this.j)
        let i1 = this.i
        let j1 = this.j
        for (let i = 0; i < cells.cells.length; i++) {
            let _i = cells.cells[i][0], _j = cells.cells[i][1]
            let that = this
            this.selectedWays.push(
                Crafty.e('2D, Canvas, Color, Mouse')
                    .attr({
                        x: boardStartPosX + _j * cellSize, 
                        y: boardStartPosY + _i * cellSize, 
                        h: cellSize, 
                        w: cellSize,
                        i: _i,
                        j: _j
                    })
                    .color('red')
                    .bind('Click', function() {
                        that.selectedWays.forEach(element => {
                            element.destroy()
                        })
                        that.selectedWays = []
                        canGoCells.forEach(element => {
                            element.destroy()
                        })
                        canGoCells.selectedWays = []
                        eng.moveChecker(i1, j1, this.i, this.j)
                    })
            )
        }
        return this
    },
    unselect: function() {
        this.color('green', 0)
        this.selectedWays.forEach(element => {
            element.destroy()
        });
        this.selectedWays = []

        canGoCells.forEach(element => {
            element.destroy()
        });
        canGoCells = []
        this.selected = 0

        
        return this
    },
    events: {
        'Draw': function(data) {
            let types = ['whiteCheck', 'blackCheck']
            let ctx = data.ctx, pos = data.pos;
            let centerX = pos._x + pos._w / 2;
            let centerY = pos._y + pos._h / 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, this.checkRadius, 0, 2 * Math.PI);
            ctx.fillStyle = themes[types[this.type]];
            ctx.fill();

            if (this.isKing == 1) {
                let ctx = data.ctx, pos = data.pos;
                let centerX = pos._x + pos._w / 2;
                let centerY = pos._y + pos._h / 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, this.checkRadius / 3, 0, 2 * Math.PI);
                ctx.fillStyle = 'red';
                ctx.fill();
            }
        },
        'MouseOver': function() {
            if (!canSelect[this.i][this.j]) {
                return;
            }
            if (this.type == whitesTurn) {
                return;
            }
            if (continueTurn && (this.i != selectedCheck[0] || this.j != selectedCheck[1])) {
                return 
            }
            if (this.selected == 0) {
                // console.log('MOUSE')
                this.color('green')
                let cells = eng.cellsToGo(this.i, this.j)
                for (let i = 0; i < cells.cells.length; i++) {
                    let _i = cells.cells[i][0], _j = cells.cells[i][1]
                    canGoCells.push(
                        Crafty.e('2D, Canvas, Color')
                            .attr({
                                x: boardStartPosX + _j * cellSize, 
                                y: boardStartPosY + _i * cellSize, 
                                h: cellSize, 
                                w: cellSize
                            })
                            .color('green')
                    )
                }
            }
        },
        'MouseOut': function() {
            if (this.type == whitesTurn)
            {
                return;
            }
            if (this.selected == 0) {
                // console.log('MOUSE')
                this.color('green', 0)
                canGoCells.forEach(element => {
                    element.destroy()
                });
                canGoCells = []
            }
        },
        'Click': function() {
            if (continueTurn && this.selected)
            {
                return
            }
            if (this.type == whitesTurn)
            {
                return;
            }
            if (continueTurn && (this.i != selectedCheck[0] || this.j != selectedCheck[1])) {
                return 
            }
            this.selected = !this.selected
            if (this.selected) { 
                this.select()
            }
            else {
                this.unselect()
                console.log(this.selectedWays)
            }
        }
    },
});
