let gameBoard;
let numbers;
let choosenCell;

function loadGame() {
    gameBoard = new Sudoku(EASY);
    numbers = createNumbers();
    createGUI();
    choosenCell = null;
}

function createGUI() {
    createBoard();
    createNumbersPanel();
}

function createBoard() {
    let boardDiv = document.getElementsByClassName("board")[0];

    for(let i = 1; i <= 81; i++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        
        boardDiv.append(cell);
    }

    boardDiv.childNodes.forEach((c, i) =>
        c.innerHTML = gameBoard.getVal(i) == EMPTY ? "" : gameBoard.getVal(i)
    )
}

function createNumbers() {
    numbers = [];
    for(let i = 1; i <= 9; i++)
        numbers.push(i);
    return numbers;
}

function createNumbersPanel() {
    let numbersDiv = document.getElementsByClassName("numbers")[0];
    numbers.forEach(n => {
        let numDiv = document.createElement("div");
        numDiv.innerHTML = n;
        numDiv.setAttribute("class", "number");
        
        numbersDiv.append(numDiv);
    });

    let delDiv = document.createElement("div");
    delDiv.innerHTML = "X";
    delDiv.setAttribute("class", "number");
    numbersDiv.append(delDiv);
    let editDiv = document.createElement("div");
    editDiv.innerHTML = "edit";
    editDiv.setAttribute("class", "number");
    numbersDiv.append(editDiv);
}

