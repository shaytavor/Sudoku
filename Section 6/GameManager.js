let gameBoard;
let numbers;
let choosenCell;
let cells;
let isDraft;

function loadGame() {
    gameBoard = new Sudoku(EASY);
    numbers = createNumbers();
    cells = createCells();
    createGUI();
    choosenCell = null;
    isDraft = false;
}

function createGUI() {
    createBoard();
    createNumbersPanel();
}

function createBoard() {
    let boardDiv = document.getElementsByClassName("board")[0];

    cells.forEach(c => {
        let cellDiv = c.render();
        cellDiv.onclick = clickCell;
        boardDiv.append(cellDiv);
    });

    boardDiv.childNodes.forEach((c, i) => {
        if(gameBoard.getVal(i) == EMPTY) {
            c.firstChild.innerHTML = " ";
        }
    });
}

function createNumbers() {
    numbers = [];
    let numbersCounts = [];

    for(let i = 0; i < 9; i++)
        numbersCounts.push(0);

    for(let i = 0; i < 81; i++)
        if(gameBoard.getVal(i) != EMPTY)
            numbersCounts[gameBoard.getVal(i) - 1]++;

    for(let i = 1; i <= 9; i++) {
        numbers.push(new Number(i));
        numbers[i-1].amount = numbersCounts[i-1];
    }
    
    return numbers;
}

function createCells() {
    let res = [];

    for(let i = 0; i < 81; i++) {
        res.push(new Cell(gameBoard.getVal(i)));
        if(gameBoard.getVal(i) != EMPTY)
            res[i].isFixed = true;
    }
    return res;
}

function createNumbersPanel() {
    let numbersDiv = document.getElementsByClassName("numbers")[0];
    numbers.forEach(n => {
        let numDiv  = n.render();
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
    editDiv.innerHTML = "draft";
    editDiv.setAttribute("class", "number");
    editDiv.setAttribute("id", "cmdDraft");
    editDiv.onclick = clickDraft;
    numbersDiv.append(editDiv);
}

function clickCell(e) {
    if(choosenCell != null)
        choosenCell.classList.remove("clicked-cell");

    choosenCell = e.target;
    let index = getCellIndex();
    if(cells[index].isFixed) {
        choosenCell = null;
        return;
    }

    choosenCell.classList.add("clicked-cell");
    
}

function clickNumber(e) {
    if(choosenCell == null)
        return;
    
    choosenCell.classList.remove("clicked-cell");
    if(isDraft) {
        toggleDraftCell();
        toggleDraftMode();
        assignDraft(e.target.firstChild.innerHTML);
    }
    else {
        toggleDraftCell();
        choosenCell.firstChild.innerHTML = e.target.firstChild.innerHTML;
        let index = getCellIndex();
        gameBoard.setVal(index, parseInt(choosenCell.firstChild.innerHTML));

        index = parseInt(e.target.firstChild.innerHTML);
        numbers[index-1].increaseAmount();
        e.target.lastChild.innerHTML = numbers[index-1].amount;

        choosenCell.classList.remove("illegal-cell");
        if(!gameBoard.isLegal(gameBoard.gameBoard))
            choosenCell.classList.add("illegal-cell");

        if(gameBoard.done())
            console.log("Done");
    }
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

    if(isDraftCell()) 
        clearDrafts();
    else {
        let num = parseInt(choosenCell.innerHTML);

        choosenCell.innerHTML = "";
        let index = getCellIndex();
        gameBoard.setVal(index, EMPTY);

        document.getElementsByClassName("numbers")[0].childNodes.forEach(
            n => {
                if(n.firstChild.innerHTML == num) {
                    numbers[num - 1].decreaseAmount();
                    n.lastChild.innerHTML = numbers[num-1].amount;
                }
            }
        )
    }
}

function clickDraft() {
    let draftDiv = document.getElementById("cmdDraft");
    if(isDraft) 
        draftDiv.classList.remove("draft-clicked");
    else
        draftDiv.classList.add("draft-clicked");
    isDraft = !isDraft;
}

function toggleDraftCell() {
    if(isDraft) {
        choosenCell.firstChild.style.diplay = "none";
        choosenCell.lastChild.style.display = "block";
    }
    else {
        choosenCell.firstChild.style.diplay = "block";
        choosenCell.lastChild.style.display = "none";
    }
}

function  toggleDraftMode() {
    let draftDiv = document.getElementById("cmdDraft");
    if(isDraft) 
        draftDiv.classList.remove("draft-clicked");
    else
        draftDiv.classList.add("draft-clicked");
    isDraft = !isDraft;
}

function assignDraft(num) {
    let numbersTable = choosenCell.lastChild.getElementsByTagName("td");
    let numInt = parseInt(num);
    let i = 0;
    for(let count = 1; i < numbersTable.length; i++, count++)
        if(count == numInt)
            break;
    if(numbersTable[i].innerHTML == "")
        numbersTable[i].innerHTML = num;
    else
        numbersTable[i].innerHTML = "";
}

function isDraftCell() {
    return choosenCell.lastChild.style.display == "block";
}

function clearDrafts() {
    let numbersTable = choosenCell.lastChild.getElementsByTagName("td");

    for(let i = 0; i < numbersTable.length; i++)
        numbersTable[i].innerHTML = "";
}