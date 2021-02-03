
const player = (name, piece) =>{
    const getPiece = () => piece;

    return {getPiece};
}
const gameBoard = (() =>{
    let board = new Array(9);
    const getBoard = (x) => board[x];
    const setBoard = (x, value) => board[x] = value;
    const reset = () => board = new Array(9);
    let flop = true;
    const playerAddMarks = (x) =>{
       return function (){
        if(getBoard(x) != 'X' && getBoard(x) != 'O' && !gameOver()){
            if(flop){
                setBoard(x, 'X');
            }
            else{
                setBoard(x, 'O');
            }
            flop = !flop;
            displayController.update();
            gameOver();
        }
        else if(gameOver()){
            console.log("Winner already Delcared");
        }
        else{
            console.log("Invalid Location");
        }
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
            console.log(`Winner ${current}`);
            return true;
        }
        else{
            for (let i = 0; i < 9; i++) {
                if(getBoard(i) != "X" && getBoard(i) != "O"){
                    return false;
                }
            }
            console.log("tied");
            return true;
        }
    };
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
    return{update};
})();

displayController.update();