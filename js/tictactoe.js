
const player = (name, piece) =>{
    const getPiece = () => piece;
    const getName = () => name;
    return {getPiece, getName};
}
const gameBoard = (() =>{
    let board = new Array(9);
    let validChoice = [0,1,2,3,4,5,6,7,8];
    let player1, player2, flop, aiLevel;
    const getBoard = (x) => board[x];
    const setBoard = (x, value) => board[x] = value;
    const reset = () => {
        board = new Array(9);
        validChoice = [0,1,2,3,4,5,6,7,8];
    }
    const playerAddMarks = (x) =>{
       return function (){
        gamestate = gameOver(board);
        if(getBoard(x) != 'X' && getBoard(x) != 'O' && gamestate == null){
            if(flop){
                setBoard(x, player1.getPiece());
            }
            else{
                setBoard(x, player2.getPiece());
            }
            flop = !flop;
            displayController.update();
            gamestate = gameOver(board);
            if(gamestate != null){
                displayController.showWinner(score(gamestate));
            }
            validChoice.splice(validChoice.indexOf(x), 1);
            console.log(validChoice);
        }
        else if(gamestate == null){
                console.log("Invalid Location");
            }
        else console.log('Winner already declared');
        if(aiLevel >0 && !flop && gamestate == null){
            if(aiLevel == 1){
                ranAi();
            }
            else if(aiLevel ==2){
                hardAi(false);
            }
        }
       };
    };
    const gameOver = (tempBoard) => {
        let valid = 0;
        let current = '';
        //Check horizontal
        for(i =0; i <3; i++){
            current = tempBoard[i*3];
            if(current == "X" || current == "O"){
                valid = 1;
                for (let j = 1; j < 3; j++) {
                    if(current == tempBoard[(i*3) +j]){
                        valid++;
                    }
                    else break;
                }
            }
            if(valid == 3)break;
        }
        //Check vertical
        if(valid !=3){
            for(i =0; i <3; i++){
                current = tempBoard[i];
                if(current == "X" || current == "O"){
                    valid = 1;
                    for (let j = 1; j < 3; j++) {
                        if(current == tempBoard[i +(j*3)]){
                            valid++;
                        }
                        else break;
                    }
                }
                if(valid == 3)break;
            }
        }
        //Check Diagonal
        if(valid !=3){
            current = tempBoard[0];
            if(current == "X" || current == "O"){
                if(current == tempBoard[4] && current == tempBoard[8]){
                    valid =3;
                }
            }
            if(valid !=3){
                current = tempBoard[2];
                if(current == "X" || current == "O"){
                    if(current == tempBoard[4] && current == tempBoard[6]){
                        valid =3;
                    }
                }
            }
        }
        //check if tie
        if(valid == 3){
            if(player1.getPiece() == current) return 1;
            else return -1;
        }
        else{
            for (let i = 0; i < 9; i++) {
                if(tempBoard[i] != "X" && tempBoard[i] != "O"){
                    return null;
                }
            }
            return 0;
        }
    };
    const createPlayers = (name1, piece1, name2, piece2, aiLvl) => {
        player1 = player(name1, piece1);
        player2 = player(name2, piece2);
        flop = piece1 == 'X';
        aiLevel = aiLvl;
        if(aiLevel >0 && !flop){
            if(aiLevel ==1){
                ranAi();
            }
            else{
                hardAi(false);
            }
        }
    }
    const ranAi = () =>{
        let move = validChoice[Math.floor(Math.random() * validChoice.length)];
        console.log(move);
        let aimove =playerAddMarks(move);
        aimove();
    }
    const hardAi = (pieceFlop) =>{
        console.log(`Flop is ${pieceFlop}`);
        let aiBoard = [...board];
        let bestMove = -1;
        let bestScore = pieceFlop ? -Infinity : Infinity;
        for (let i = 0; i < 9; i++) {
            if(aiBoard[i] == null){
                console.log(aiBoard);
                aiBoard[i] = player2.getPiece();
                console.log(aiBoard);
                let currentScore = minMax(aiBoard, 0, !pieceFlop);
                if(pieceFlop && currentScore > bestScore) {
                    bestScore = currentScore;
                    bestMove = i;
                }else if(!pieceFlop && currentScore < bestScore){
                    bestScore = currentScore;
                    bestMove = i;
                }
                aiBoard[i] = null;
            }
        }
        let aimove =playerAddMarks(bestMove);
        aimove();
    }
    const minMax = (tempBoard,depth, isMaximizing) =>{
        let gamestate = gameOver(tempBoard);
        let bestVal = isMaximizing ? -Infinity : Infinity;
        if( gamestate != null){
            return gamestate;
        }
        if(isMaximizing){
            for (let i = 0; i < 9; i++) {
                if(tempBoard[i] == null){
                    tempBoard[i] = 'X';
                    bestVal = Math.max(bestVal, minMax(tempBoard, depth+1, !isMaximizing));
                    tempBoard[i] = null;
                }
            }
            return bestVal;
        }
        else{
            for (let i = 0; i < 9; i++) {
                if(tempBoard[i] == null){
                    tempBoard[i] = 'O';
                    bestVal = Math.min(bestVal, minMax(tempBoard, depth+1, !isMaximizing));
                    tempBoard[i] = null;
                }
            }
            return bestVal;
        }
    }
    const score = (x) =>{
        return x ==0 ? 'You Tied': x == 1 ? `${player1.getName()} Won!` : `${player2.getName()} Won!`;
    };
    return {getBoard, setBoard, reset, playerAddMarks, createPlayers};
})();
const displayController = (() =>{
    const board = document.getElementById('gameBoard');
    const update = () =>{
        board.style.display = 'grid';
        while (board.firstChild) {
            board.removeChild(board.lastChild);
        }
        for(i =0; i< 9; i++){
            let cell = document.createElement("div");
            if(gameBoard.getBoard(i) == 'X' || gameBoard.getBoard(i) == 'O'){
                cell.innerText = gameBoard.getBoard(i);
            }
            cell.setAttribute('id', `${i}}`);
            cell.addEventListener('click', gameBoard.playerAddMarks(i));
            board.appendChild(cell).className = "grid-item";
        }
    }
    const showWinner = (x) =>{
        const gameOver = document.getElementById("gameOver");
        const displayWinner = document.getElementById("displayWinner");
        gameOver.style.display = 'block';
        displayWinner.innerText = x;
    }
    const reset = () =>{
        gameBoard.reset();
        board.style.display = 'none';
        const gameOver = document.getElementById("gameOver");
        const displayWinner = document.getElementById("displayWinner");
        const startDiv = document.getElementById("start");
        gameOver.style.display = 'none';
        displayWinner.innerText = '';
        startDiv.style.display = 'block';
    };
    const start = () =>{
        const player1 = document.getElementById("player1");
        const player2 = document.getElementById("player2");
        const startDiv = document.getElementById("start");
        const piece = document.getElementsByName('Mark');
        const opponent = document.getElementsByName('opponent');
        let aiLvl =0;
        for (let i = 0; i < opponent.length; i++) {
            console.log(opponent[i]);
            if(opponent[i].checked == true){
                console.log(aiLvl);
                aiLvl = opponent[i].value;
                console.log(aiLvl);
                break;
            }
        }
        if(piece[0].checked)gameBoard.createPlayers(player1.value, 'X', player2.value, "O", aiLvl);
        else gameBoard.createPlayers(player1.value, 'O', player2.value, "X", aiLvl);
        startDiv.style.display = 'none';
        update();
    }
    const resetBtn = document.getElementById('resetBtn');
    const startBtn = document.getElementById('startBtn');
    resetBtn.addEventListener('click',reset);
    startBtn.addEventListener('click',start);
    return{update, showWinner, reset};
})();
