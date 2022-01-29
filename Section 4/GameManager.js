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
        cell.onclick = clickCell;
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
        numDiv.onclick = clickNumber;
        numbersDiv.append(numDiv);
    });

    let delDiv = document.createElement("div");
    delDiv.innerHTML = "X";
    delDiv.setAttribute("class", "number");
    delDiv.onclick = deleteCell;
    delDiv.setAttribute("id", "cmdX");
    
    numbersDiv.append(delDiv);
    let editDiv = document.createElement("div");
    editDiv.innerHTML = "edit";
    editDiv.setAttribute("class", "number");
    numbersDiv.append(editDiv);
}

function clickCell(e) {
    if(choosenCell != null)
        choosenCell.classList.remove("clicked-cell");

    choosenCell = e.target;
    choosenCell.classList.add("clicked-cell");
    
}

function clickNumber(e) {
    if(choosenCell == null)
        return;
     

    choosenCell.innerHTML = e.target.innerHTML;
    let index = getCellIndex();
    gameBoard.setVal(index, parseInt(choosenCell.innerHTML));
    choosenCell.classList.remove("clicked-cell");

    choosenCell.classList.remove("illegal-cell");
    if(!gameBoard.isLegal(gameBoard.gameBoard))
        choosenCell.classList.add("illegal-cell");

    if(gameBoard.done())
        console.log("Done");
        
    choosenCell = null;
}

function getCellIndex() {
    let boardDiv = document.getElementsByClassName("board")[0];
    for(let i = 0; i < boardDiv.childNodes.length; i++)
        if(boardDiv.childNodes[i] == choosenCell)
            return i;
}

function deleteCell(e) {
    if(choosenCell == null)
        return ;
    choosenCell.classList.remove("clicked-cell");
    choosenCell.classList.remove("illegal-cell");
    choosenCell.innerHTML = "";
    let index = getCellIndex();
    gameBoard.setVal(index, EMPTY);
}