const EMPTY = 0;
const EASY = 0, MEDIUM = 1, HARD = 2, EVIL = 3;
const EMPTY_CELLS = [42, 50, 55, 60];

class Sudoku {
    constructor(level) {
        this.N = 9;
        this.level = level;
        this.board = this.createEmptyBoard();
        this.createBoard(0, 0);
        this.gameBoard = this.createEmptyBoard();
        this.copyBoard();
        this.generateGameBoard();
    }

    copyBoard() {
        for(let i = 0; i < this.N; i++)
            for(let j = 0; j < this.N; j++)
                this.gameBoard[i][j] = this.board[i][j];
    }

    generateGameBoard() {
        for(let i = 1; i <= EMPTY_CELLS[this.level]; i++) {
            let row = Math.floor(Math.random() * this.N);
            let col = Math.floor(Math.random() * this.N);
            while(this.gameBoard[row][col] == EMPTY) {
                row = Math.floor(Math.random() * this.N);
                col = Math.floor(Math.random() * this.N);
            }
            this.gameBoard[row][col] = EMPTY;
        }
    }






    createEmptyBoard() {
        let res = [];
        for(let i = 0; i < this.N; i++) {
            let row = [];
            for(let j = 0; j < this.N; j++) 
                row.push(EMPTY);
            res.push(row);
        }
        return res;
    }

    createBoard(row, col) {
        if(col == this.N) {
            row++;
            col = 0;
        }
        if(row == this.N)
            return this.isLegal(this.board);

        let numbers = [];
        for(let i = 1; i <= this.N; i++)
            numbers.push(i);
        this.shuffle(numbers);
        for(let i = 0; i < numbers.length; i++) {
            this.board[row][col] = numbers[i];
            if(this.isLegal(this.board))
                if(this.createBoard(row, col + 1))
                    return true;
        }
        this.board[row][col] = EMPTY;
        return false;
    }

    shuffle(arr) {
        arr.forEach((element, i) => {
            let ind = Math.floor(Math.random() * this.N);
            let temp = arr[i];
            arr[i] = arr[ind];
            arr[ind] = temp;
        });
    }

    isLegal(boardArr) {
        return this.checkRows(boardArr) && this.checkCols(boardArr) 
                && this.checkSquares(boardArr);
    }

    checkRows(boardArr) {
        return boardArr.every(row => this.isValidArr(row));
    }

    checkCols(boardArr) {
        for(let i = 0; i < this.N; i++) {
            let col = boardArr.map(row => row[i]);
            if(!this.isValidArr(col))
                return false;
        }
        return true;
    }

    checkSquares(boardArr) {
        for(let i = 0; i < this.N; i += 3) {
            for(let j = 0; j < this.N; j += 3) {
                let arr = [];
                for(let k = i; k < i + 3; k++)
                    for(let w = j; w < j + 3; w++)
                        arr.push(boardArr[k][w]);
                if(!this.isValidArr(arr))
                    return false;
            }
        }
        return true;
    }

    isValidArr(arr) {
        let a = [];
        for(let i = 0; i <= this.N; i++)
            a.push(0);
            
        arr.forEach(element => a[element]++);
        a[0] = 0;
        return a.every(element => element == 1 || element == EMPTY);
    }

    getVal(ind) {
        let row = Math.floor(ind / this.N);
        let col = ind % this.N;
        return this.gameBoard[row][col];
    }

    setVal(ind, value) {
        let row = Math.floor(ind / this.N);
        let col = ind % this.N;
        this.gameBoard[row][col] = value;
    }

    done() {
        return this.board.every((row, i) =>
            row.every((num, j) => num == this.gameBoard[i][j]));
    }
}