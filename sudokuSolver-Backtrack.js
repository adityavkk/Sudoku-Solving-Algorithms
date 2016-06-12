function solve(solveArray, puzz) {
  function inRow(num, rowIndex) {
    return puzz[rowIndex].indexOf(num) > -1;
  }

  function inCol(num, colIndex) {
    var col = [];
    puzz.forEach(function(row) {
      col.push(row[colIndex]);
    });
    return col.indexOf(num) > -1;
  }

  function inBox(num, rowIndex, colIndex) {
    //array of all elements in corresponding box
    var boxTopLeftCoordinates = [
      [0, 0],
      [0, 3],
      [0, 6],
      [3, 0],
      [3, 3], 
      [3, 6],
      [6, 0],
      [6, 3],
      [6, 6]
    ];
    var correspondingBox = boxTopLeftCoordinates.filter(function(box) {
      return (rowIndex >= box[0] && rowIndex < box[0] + 3) && (colIndex >= box[1] && colIndex < box[1] + 3);
    });
    var boxArray = [];
    for (var i = correspondingBox[0][0]; i <= correspondingBox[0][0] + 2; i++) {
      for (var j = correspondingBox[0][1]; j <= correspondingBox[0][1] + 2; j++) {
        boxArray.push(puzz[i][j]);
      }
    }
    return boxArray.indexOf(num) > -1;
  }

  function isValid(num, rowIndex, colIndex) {
    return !inRow(num, rowIndex, colIndex) && !inCol(num, colIndex) && !inBox(num, rowIndex, colIndex);
  }
  function emptyCellCoordinatesGen(puzz){
    var emptyCells = [];
    for (var i = 0; i < 9; i++) {
      for(var j = 0; j < 9; j++){
        if(puzz[i][j] === 0)
          emptyCells.push([i,j]);
      }
    }
    return emptyCells;
  }
  var i = 0,
    steps = 0,
    emptyCell = emptyCellCoordinatesGen(puzz),
    n;
  while (i < emptyCell.length) {
    steps++;
    if (steps > 1000000)
      return false;
    if (puzz[emptyCell[i][0]][emptyCell[i][1]] === 0)
      n = 0;
    else
      n = solveArray.indexOf(puzz[emptyCell[i][0]][emptyCell[i][1]]) + 1;
    while (!isValid(solveArray[n], emptyCell[i][0], emptyCell[i][1]) && n <= solveArray.length - 1) {
      n++;
    }
    if (n == solveArray.length) {
      puzz[emptyCell[i][0]][emptyCell[i][1]] = 0;
      i--;
      if (i == -1)
        return false;
      continue;
    }
    puzz[emptyCell[i][0]][emptyCell[i][1]] = solveArray[n];
    i++;
  }
  console.log('steps', steps);
  return puzz;
}

function sudoku(puzz) {
  var solveArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return solve(solveArray, puzz);
}

var puzzle = [
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 6, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 9, 0, 2, 0, 0],
  [0, 5, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 4, 5, 7, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 3, 0],
  [0, 0, 1, 0, 0, 0, 0, 6, 8],
  [0, 0, 8, 5, 0, 0, 0, 1, 0],
  [0, 9, 0, 0, 0, 0, 4, 0, 0]
];
console.log(sudoku(puzzle1));
