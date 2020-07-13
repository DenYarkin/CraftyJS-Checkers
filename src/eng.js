let map = [];
let canSelect = [];

let whitesTurn = true;

const eng = {
    init() {
        for (let i = 0; i < boardSize; i++) {
            map.push([]);
            canSelect.push([]);
            for (let j = 0; j < boardSize; j++) {
                let checker = {};
                if ((i + j) % 2 === 0) {
                    if (i < boardSize / 2 - 1) {
                        checker.type = 2;
                    } else if (i > boardSize / 2) {
                        checker.type = 1;
                    } else {
                        checker.type = 0;
                    }
                } else {
                    checker.type = 0;
                }
                checker.isKing = false;
                map[i].push(checker);
                canSelect[i].push(0);
            }
        }
    },
    cellsToGo(row, col) {
        let ally = map[row][col].type;
        let enemy = 3 - ally;
        let dirs = [];
        if (map[row][col].isKing) {
            dirs = [
                [1, 1],
                [1, -1],
                [-1, 1],
                [-1, -1]
            ];
        } else if (map[row][col].type === 2) {
            dirs = [
                [1, 1],
                [1, -1]
            ];
        } else {
            dirs = [
                [-1, 1],
                [-1, -1]
            ];
        }
        let canBeat = false;
        let cells = [];
        let cellsToBeat = [];
        if (!map[row][col].isKing) {
            for (let [rowDt, colDt] of dirs) {
                if (
                    row + rowDt < 0 ||
                    row + rowDt >= boardSize ||
                    col + colDt < 0 ||
                    col + colDt >= boardSize
                ) {
                    continue;
                }

                if (!map[row + rowDt][col + colDt].type) {
                    cells.push([row + rowDt, col + colDt]);
                } else if (
                    row + 2 * rowDt >= 0 &&
                    row + 2 * rowDt < boardSize &&
                    col + 2 * colDt >= 0 &&
                    col + 2 * colDt < boardSize &&
                    map[row + rowDt][col + colDt].type === enemy &&
                    !map[row + 2 * rowDt][col + 2 * colDt].type
                ) {
                    cellsToBeat.push([row + 2 * rowDt, col + 2 * colDt]);
                    canBeat = true;
                }
            }
        } else {
            for (let [rowDt, colDt] of dirs) {
                let countCheckers = 0;
                for (
                    let [i, j] = [row + rowDt, col + colDt];
                    i >= 0 && j >= 0 && i < boardSize && j < boardSize;
                    i += rowDt, j += colDt
                ) {
                    if (map[i][j].type === ally) {
                        break;
                    }
                    if (map[i][j].type === enemy) {
                        countCheckers++;
                        if (countCheckers == 2) {
                            break;
                        }
                        continue;
                    }
                    if (!countCheckers) {
                        cells.push([i, j]);
                    } else {
                        cellsToBeat.push([i, j]);
                        canBeat = true;
                    }
                }
            }
        }

        return {
            cells: canBeat ? cellsToBeat : cells,
            canBeat
        };
    },
    moveChecker(fromI, fromJ, toI, toJ) {
        if (
            (map[fromI][fromJ].type === 1 && toI === 0) ||
            (map[fromI][fromJ].type === 2 && toI === boardSize - 1)
        ) {
            map[fromI][fromJ].isKing = true;
        }
        map[toI][toJ] = { ...map[fromI][fromJ] };
        map[fromI][fromJ] = { type: 0, isKing: false };
        let rowDt = 1;
        let colDt = 1;
        if (toI < fromI) {
            rowDt *= -1;
        }
        if (toJ < fromJ) {
            colDt *= -1;
        }

        let canBeat = false;
        for (
            let [i, j] = [fromI + rowDt, fromJ + colDt];
            i != toI;
            i += rowDt, j += colDt
        ) {
            if (map[i][j].type) {
                canBeat = true;
            }
            map[i][j] = { type: 0, isKing: false };
        }

        if (!canBeat) {
            whitesTurn = !whitesTurn;
            continueTurn = false;
            selectedCheck = [];
            clean();
            draw();
            return;
        }
        let canBeatAgain = this.cellsToGo(toI, toJ).canBeat;
        if (!canBeatAgain) {
            whitesTurn = !whitesTurn;
            continueTurn = false;
            selectedCheck = [];
            clean();
            draw();
            return;
        }
        continueTurn = true;
        selectedCheck = [toI, toJ];
        clean();
        draw();
    },
    calcCanSelect() {
        let canBeat = false;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                canSelect[i][j] = 0;
                if (map[i][j].type === 0) {
                    continue;
                }
                if (
                    (map[i][j].type === 1 && whitesTurn) ||
                    (map[i][j].type === 2 && !whitesTurn)
                ) {
                    if (this.cellsToGo(i, j).canBeat) {
                        canBeat = true;
                        canSelect[i][j] = true;
                    }
                }
            }
        }
        if (!canBeat) {
            for (let i = 0; i < boardSize; i++) {
                    for (let j = 0; j < boardSize; j++) {
                    if (
                        (map[i][j].type === 1 && whitesTurn) ||
                        (map[i][j].type === 2 && !whitesTurn)
                    ) {
                        canSelect[i][j] = true;
                    }
                }
            }
            return;
        }
    }
};
