function GameManager() {
    document.addEventListener('keydown', onKeyDown);

    var grid = new Grid(22, 10);
    // best move possible
    var aiBest = new AI({
        heightWeight: 0.510066,
        linesWeight: 0.760666,
        holesWeight: 0.55663,
        bumpinessWeight: 0.184483
    });
    var workingPiece = null;
    var isAiActive = true;
    var isKeyEnabled = false;


    // Process start of turn
    function startTurn(workingPieces){
        if(isAiActive){
            isKeyEnabled = false;
            const bestMoves = aiBest.best(grid, workingPieces);
        
            while(bestMoves[0].moveDown(grid)); // Drop working piece
            if(!endTurn(bestMoves[0])){
                alert('Game Over!--');
                return;
            }
            return bestMoves;
        }else{
            isKeyEnabled = true;
        }
    }

    function getBestMoves(frontGrid, pieceIndex) {
        let workingPieces = [];
        if (pieceIndex.length == 1) {
            workingPieces = [Piece.fromIndex(pieceIndex[0])]
        } else {
            workingPieces = [Piece.fromIndex(pieceIndex[0]), Piece.fromIndex(pieceIndex[1])]
        }
        grid = new Grid(frontGrid.board);
        return startTurn(workingPieces);
    }

    // Process end of turn
    function endTurn(bestMoves){
        // Add working piece
        grid.addPiece(bestMoves);

        // Clear lines
        grid.clearLines();

        return !grid.exceeded();
    }

    // Process keys
    function onKeyDown(event){
        if(!isKeyEnabled){
            return;
        }
        switch(event.which){
            case 32: // spacebar
                isKeyEnabled = false;
                gravityTimer.stop(); // Stop gravity
                startWorkingPieceDropAnimation(function(){ // Start drop animation
                    while(workingPiece.moveDown(grid)); // Drop working piece
                    if(!endTurn()){
                        alert('Game Over!');
                        return;
                    }
                    startTurn();
                });
                break;
            case 40: // down
                gravityTimer.resetForward(500);
                break;
            case 37: //left
                if(workingPiece.canMoveLeft(grid)){
                    workingPiece.moveLeft(grid);
                    redrawGridCanvas();
                }
                break;
            case 39: //right
                if(workingPiece.canMoveRight(grid)){
                    workingPiece.moveRight(grid);
                    redrawGridCanvas();
                }
                break;
            case 38: //up
                workingPiece.rotate(grid);
                redrawGridCanvas();
                break;
        }
    }

    this.getBestMoves = getBestMoves;
    // startTurn(workingPieces);
}
