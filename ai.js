/**
 * @param {Object} weights
 * @param {number} weights.heightWeight
 * @param {number} weights.linesWeight
 * @param {number} weights.holesWeight
 * @param {number} weights.bumpinessWeight
 */
function AI(weights){
    this.heightWeight = weights.heightWeight;
    this.linesWeight = weights.linesWeight;
    this.holesWeight = weights.holesWeight;
    this.bumpinessWeight = weights.bumpinessWeight;
};

AI.prototype._best = function(grid, workingPieces, workingPieceIndex){
    var best = [null, null, null];
    var bestScore = [null, null, null];

    var workingPiece = workingPieces[workingPieceIndex];

    for(var rotation = 0; rotation < 4; rotation++){
        var _piece = workingPiece.clone();
        for(var i = 0; i < rotation; i++){
            _piece.rotate(grid);
        }

        while(_piece.moveLeft(grid));

        while(grid.valid(_piece)){
            var _pieceSet = _piece.clone();
            while(_pieceSet.moveDown(grid));

            var _grid = grid.clone();
            _grid.addPiece(_pieceSet);

            var score = null;
            if (workingPieceIndex == (workingPieces.length - 1)) {
                score = -this.heightWeight * _grid.aggregateHeight() + this.linesWeight * _grid.lines() - this.holesWeight * _grid.holes() - this.bumpinessWeight * _grid.bumpiness();
            }else{
                score = this._best(_grid, workingPieces, workingPieceIndex + 1).score[0];
            }
            // console.log(_pieceSet);

            if (score > bestScore[0] || bestScore[0] == null){
                bestScore[0] = score;
                best[0] = _pieceSet.clone();
            } 
            if (bestScore[0] != null && bestScore[1] == null && score != bestScore[0]) {
                bestScore[1] = score;
                best[1] = _pieceSet.clone();
            }
            if (bestScore[0] != null && bestScore[1] != null && bestScore[2] == null && score != bestScore[0] && score != bestScore[1]) {
                bestScore[2] = score;
                best[2] = _pieceSet.clone();
            }

            _piece.column++;
        }
    }
    
    return {piece:best, score: bestScore};
};

AI.prototype.best = function(grid, workingPieces){
    var test = this._best(grid, workingPieces, 0);
    console.log(test);
    return test.piece;
    // return this._best(grid, workingPieces, 0).piece;
};
