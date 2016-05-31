//Backtacking brute force algorithm to solve easy, solvable puzzles (input is a 2D array)

function sudoku(puzzle) {
  var solvedPuzzle = puzzle;
  var emptyCell = [];
  for (var i = 0; i < 9; i++) {
  	for(var j = 0; j < 9; j++){
  		if(puzzle[i][j] === 0)
  			emptyCell.push([i,j]);
  	}
  }
  function inRow(num, rowIndex){
  	return solvedPuzzle[rowIndex].indexOf(num) > -1;
  }
  function inCol(num, colIndex){
  	var col = [];
  	solvedPuzzle.forEach(function(row){
  		col.push(row[colIndex]);
  	});
  	return col.indexOf(num) > -1;
  }
  function inBox(num, rowIndex, colIndex){
  	//generate an array of all elements in corresponding box
  	var boxTopLeftCoordinates = [[0,0],[0,3],[0,6],[3,0],[3,3],[3,6],[6,0],[6,3],[6,6]];
  	var correspondingBox = boxTopLeftCoordinates.filter(function(box){
  		return (rowIndex >= box[0] && rowIndex < box[0]+3) && (colIndex >= box[1] && colIndex < box[1]+3);
  	});
  	var boxArray = [];
  	for(var i = correspondingBox[0][0]; i <= correspondingBox[0][0]+2; i++){
  		for(var j = correspondingBox[0][1]; j <= correspondingBox[0][1]+2; j++){
  			boxArray.push(solvedPuzzle[i][j]);
  		}
		}
		return boxArray.indexOf(num) > -1;
  }
  function isValid(num, rowIndex, colIndex){
  	return !inRow(num, rowIndex, colIndex) && !inCol(num, colIndex) && !inBox(num, rowIndex, colIndex);
  }
  var i = 0, steps = 0;
  while (i < emptyCell.length) {
    steps++;
  	var n = solvedPuzzle[emptyCell[i][0]][emptyCell[i][1]]+1;
  	while(!isValid(n, emptyCell[i][0], emptyCell[i][1]) && n <= 9){
  		n++;
  	}
  	if(n == 10){
  		solvedPuzzle[emptyCell[i][0]][emptyCell[i][1]] = 0;
  		i--;
  		continue;
  	}
  	solvedPuzzle[emptyCell[i][0]][emptyCell[i][1]] = n;
  	i++;
  }
  console.log('steps:',steps);
  return solvedPuzzle;
}

 // var samplePuzzle = [
 //    [0,2,0,0,0,0,0,0,0],
 //    [0,0,0,6,0,0,0,0,3],
 //    [0,7,4,0,8,0,0,0,0],
 //    [0,0,0,0,0,3,0,0,2],
 //    [0,8,0,0,4,0,0,1,0],
 //    [6,0,0,5,0,0,0,0,0],
 //    [0,0,0,0,1,0,7,8,0],
 //    [5,0,0,0,0,9,0,0,0],
 //    [0,0,0,0,0,0,0,4,0]];


