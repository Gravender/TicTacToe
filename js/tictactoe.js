
const player = (name, piece) =>{
    const getPiece = () => piece;
    const getName = () => name;
    return {getPiece, getName};
}
const gameBoard = (() =>{
    let board = new Array(9);
    let player1, player2, flop;
    const getBoard = (x) => board[x];
    const setBoard = (x, value) => board[x] = value;
    const reset = () => board = new Array(9);
    const playerAddMarks = (x) =>{
       return function (){
        gamestate = gameOver();
        if(getBoard(x) != 'X' && getBoard(x) != 'O' && gamestate == ''){
            if(flop){
                setBoard(x, player1.getPiece());
            }
            else{
                setBoard(x, player2.getPiece());
            }
            flop = !flop;
            displayController.update();
            gamestate = gameOver();
            if(gamestate != ''){
                displayController.showWinner(gamestate);
            }
        }
        else if(gamestate == ''){
                console.log("Invalid Location");
            }
        else console.log('Winner already declared');
       };
    };
    const gameOver = () => {
        let valid = 0;
        let current = '';
        //Check horizontal
        for(i =0; i <3; i++){
            current = getBoard(i*3);
            if(current == "X" || current == "O"){
                valid = 1;
                for (let j = 1; j < 3; j++) {
                    if(current == getBoard((i*3) +j)){
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
                current = getBoard(i);
                if(current == "X" || current == "O"){
                    valid = 1;
                    for (let j = 1; j < 3; j++) {
                        if(current == getBoard(i +(j*3))){
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
            current = getBoard(0);
            if(current == "X" || current == "O"){
                if(current == getBoard(4) && current == getBoard(8)){
                    valid =3;
                }
            }
            if(valid !=3){
                current = getBoard(2);
                if(current == "X" || current == "O"){
                    if(current == getBoard(4) && current == getBoard(6)){
                        valid =3;
                    }
                }
            }
        }
        //check if tie
        if(valid == 3){
            if(player1.getPiece() == current) return `${player1.getName()} Won!`;
            else return `${player2.getName()} Won!`;
        }
        else{
            for (let i = 0; i < 9; i++) {
                if(getBoard(i) != "X" && getBoard(i) != "O"){
                    return '';
                }
            }
            return "You Tied!";
        }
    };
    const createPlayers = (name1, piece1, name2, piece2) => {
        player1 = player(name1, piece1);
        player2 = player(name2, piece2);
        flop = true;
    }
    return {getBoard, setBoard, reset, playerAddMarks, gameOver, createPlayers};
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
            cell.style.backgroundColor = '#ffffff';
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
        gameBoard.createPlayers(player1.value, 'X', player2.value, "O");
        startDiv.style.display = 'none';
        update();
    }
    const resetBtn = document.getElementById('resetBtn');
    const startBtn = document.getElementById('startBtn');
    resetBtn.addEventListener('click',reset);
    startBtn.addEventListener('click',start);
    return{update, showWinner, reset};
})();
