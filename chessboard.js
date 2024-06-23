function printChessboard(gridSize) {
    let line = ""
    let line2 = ""
    for (let i = 0; i < gridSize; i++) {
        if (i % 2 === 0) {
            line += " "
            line2 += "#"
        } else {
            line += "#"
            line2 += " "
        }
    }
    for (let i = 0; i < gridSize; i++) {
        if (i % 2 === 0) {
            console.log(`${line}`)
        } else {
            console.log(`${line2}`)
        }
    }
}

printChessboard(9)