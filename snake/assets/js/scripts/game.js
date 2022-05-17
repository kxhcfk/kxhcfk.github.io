"use strict";

var game = function game() {
  var canvas = document.getElementById('game'),
      context = canvas.getContext('2d');
  var grid = 16,
      count = 0;
  var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
  };
  var apple = {
    x: 320,
    y: 320
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function restartGame(loop) {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
  }

  function loop() {
    requestAnimationFrame(loop);

    if (++count < 7) {
      return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
      restartGame();
    }

    snake.cells.unshift({
      x: snake.x,
      y: snake.y
    });

    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }

      for (var i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          restartGame();
        }
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.code === 'ArrowLeft' && snake.dx === 0) {
      snake.dx = -grid;
      snake.dy = 0;
    } else if (e.code === 'ArrowUp' && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    } else if (e.code === 'ArrowRight' && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    } else if (e.code === 'ArrowDown' && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    }
  });
  requestAnimationFrame(loop);
};

game();
//# sourceMappingURL=game.js.map
