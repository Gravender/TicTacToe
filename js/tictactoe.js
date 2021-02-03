
const player = (name, piece) =>{
    const getPiece = () => piece;
    const getName = () => name;
    return {getPiece, getName};
}
const gameBoard = (() =>{
    let board = new Array(9);
    let player1, player2;
    const getBoard = (x) => board[x];
    const setBoard = (x, value) => board[x] = value;
    const reset = () => board = new Array(9);
    let flop = true;
    const playerAddMarks = (x) =>{
       return function (){
        gamestate = gameOver();
        if(getBoard(x) != 'X' && getBoard(x) != 'O' && gamestate == ''){
            if(flop){
                setBoard(x, 'X');
            }
            else{
                setBoard(x, 'O');
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
            return `${current} Won!`;
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
    }
    return {getBoard, setBoard, reset, playerAddMarks, gameOver};
})();
const displayController = (() =>{
    const board = document.getElementById('gameBoard');
    const update = () =>{
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
        const displayWinner = document.getElementById("displayWinner");
        displayWinner.style.display = 'block';
        displayWinner.innerText = x;
    }
    return{update, showWinner};
})();

displayController.update();