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
  var i = 0, invalidBool = false;
  while (i < emptyCell.length) {
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

  return solvedPuzzle;
}

//  var puzzle = [
//     [5,3,0,0,7,0,0,0,0],
//     [6,0,0,1,9,5,0,0,0],
//     [0,9,8,0,0,0,0,6,0],
//     [8,0,0,0,6,0,0,0,3],
//     [4,0,0,8,0,3,0,0,1],
//     [7,0,0,0,2,0,0,0,6],
//     [0,6,0,0,0,0,2,8,0],
//     [0,0,0,4,1,9,0,0,5],
//     [0,0,0,0,8,0,0,7,9]];

// var algSolution = sudoku(puzzle);
// var solution = [
//   [5,3,4,6,7,8,9,1,2],
//   [6,7,2,1,9,5,3,4,8],
//   [1,9,8,3,4,2,5,6,7],
//   [8,5,9,7,6,1,4,2,3],
//   [4,2,6,8,5,3,7,9,1],
//   [7,1,3,9,2,4,8,5,6],
//   [9,6,1,5,3,7,2,8,4],
//   [2,8,7,4,1,9,6,3,5],
//   [3,4,5,2,8,6,1,7,9]];
// console.log(algSolution.toString() == solution.toString());

