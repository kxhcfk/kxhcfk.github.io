const game = () => {
    const canvas = document.getElementById('game'),
        context = canvas.getContext('2d'),
        mobileNav = document.querySelector('.snake__navigation'),
        progress = document.querySelector('#count');

    let grid = 16,
        count = 0;

    let snake = {
        x: 160,
        y: 160,
        dx: grid,
        dy: 0,
        cells: [],
        maxCells: 4
    };

    let apple = {
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
        progress.textContent = snake.cells.length;
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
                progress.textContent = snake.cells.length - 3;
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

    mobileNav.addEventListener('click', (e) => {
        if ((e.target.classList.contains('snake__arrow-top') ||
                e.target.closest('.snake__arrow-top')) && snake.dy === 0) {
            snake.dy = -grid;
            snake.dx = 0;
        } else if ((e.target.classList.contains('snake__arrow-left') ||
                e.target.closest('.snake__arrow-left')) && snake.dx === 0) {
            snake.dx = -grid;
            snake.dy = 0;
        } else if ((e.target.classList.contains('snake__arrow-right') ||
                e.target.closest('.snake__arrow-right')) && snake.dx === 0) {
            snake.dx = grid;
            snake.dy = 0;
        } else if ((e.target.classList.contains('snake__arrow-down') ||
                e.target.closest('.snake__arrow-down')) && snake.dy === 0) {
            snake.dy = grid;
            snake.dx = 0;
        }
    })

    requestAnimationFrame(loop);
};

game();

"use strict";
//# sourceMappingURL=main.js.map
