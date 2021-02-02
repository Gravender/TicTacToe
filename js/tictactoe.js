
const player = (name, piece) =>{
    const getPiece = () => piece;

    return {getPiece};
}
const gameBoard = (() =>{
    let board = new Array(9);
    const getBoard = (x) => board[x];
    const setBoard = (x, value) => board[x] = value;
    const reset = () => board = new Array(9);

    return {getBoard, setBoard, reset};
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
            /* cell.addEventListener('click', gameBoard.move(i)); */
            board.appendChild(cell).className = "grid-item";
        }
    }
    return{update};
})();

displayController.update();