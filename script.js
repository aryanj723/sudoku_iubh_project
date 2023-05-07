const grid = document.getElementById("sudoku-grid");
const solveButton = document.getElementById("solve-button");

function createSudokuGrid() {
    for (let i = 0; i < 81; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.min = "1";
        input.max = "9";
        input.addEventListener("input", validateInput);
        grid.appendChild(input);
    }
}

function validateInput(event) {
    const value = event.target.value;
    if (value < 1 || value > 9 || isNaN(value)) {
        event.target.value = "";
    }
}

function getGridValues() {
    const values = [];
    for (let i = 0; i < 81; i++) {
        const value = parseInt(grid.children[i].value, 10);
        values.push(isNaN(value) ? 0 : value);
    }
    return values;
}

function setGridValues(values) {
    for (let i = 0; i < 81; i++) {
        grid.children[i].value = values[i] === 0 ? "" : values[i];
    }
}

function isValid(values, row, col, num) {
    for (let i = 0; i < 9; i++) {
        const rowIndex = Math.floor(row / 3) * 3 + Math.floor(i / 3);
        const colIndex = Math.floor(col / 3) * 3 + i % 3;
        if (values[row * 9 + i] === num || values[i * 9 + col] === num || values[rowIndex * 9 + colIndex] === num) {
            return false;
        }
    }
    return true;
}

function solveSudokuRecursively(values) {
    let row = -1;
    let col = -1;
    let isEmpty = true;

    for (let i = 0; i < 81; i++) {
        if (values[i] === 0) {
            row = Math.floor(i / 9);
            col = i % 9;
            isEmpty = false;
            break;
        }
    }

    if (isEmpty) {
        return true;
    }

    for (let num = 1; num <= 9; num++) {
        if (isValid(values, row, col, num)) {
            values[row * 9 + col] = num;

            if (solveSudokuRecursively(values)) {
                return true;
            }

            values[row * 9 + col] = 0;
        }
    }
    return false;
}

function solveSudoku() {
    const values = getGridValues();
    if (solveSudokuRecursively(values)) {
        setGridValues(values);
    } else {
        alert("No solution found.");
    }
}

solveButton.addEventListener("click", solveSudoku);
createSudokuGrid();
