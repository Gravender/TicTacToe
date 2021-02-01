const gameBoard = (() =>{
    let board = Array.from(Array(3), () => new Array(3));

})();
const displayController = (() =>{
    let board = Array.from(Array(3), () => new Array(3));

})();
const player = (name, piece) =>{
    const getPiece = () => piece;

    return {getPiece};
}