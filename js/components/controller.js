import { Model } from "./model.js";
import { View } from "./vew.js";

export class Controller {
    constructor(gridElement) {
        this.view = new View(gridElement);
        this.board = this.view.getBoard()
        this.data = new Model().getShips();

        this.timer = 0;
        this.timerInterval = null;
        this.timerElement = document.getElementById('timerElementId');
        this.movesCount = 0;
        this.gameModel = new Model();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer += 0.5;
            this.updateTimerDisplay();
        }, 500);
    }



    updateTimerDisplay() {
        const seconds = Math.floor(this.timer);
        this.timerElement.textContent = `Time: ${seconds.toString().padStart(2, '0')}`;
    }

    startGame() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                this.board[i][j].addEventListener('click', () => {
                    if (!this.board[i][j].revealed) {
                        this.movesCount++;
                        if (this.checkShip(i, j)) {
                            this.view.showShips(this.board[i][j]);
                            if (!this.timerInterval) {
                                this.startTimer();
                            }
                        } else {
                            this.view.showHits(this.board[i][j]);
                            if (!this.timerInterval) {
                                this.startTimer();
                            }
                        }
                        this.board[i][j].revealed = true;
                        this.updateMovesCounter();
                    }
                });
            }
        }
    }


    updateMovesCounter() {
        const movesCounterElement = document.getElementById('movesCounterElementId');
        movesCounterElement.textContent = `Moves: ${this.movesCount}`;
    }

    endGame() {
        clearInterval(this.timerInterval);
        const endBlock = document.querySelector('.end');
        const overlay = document.querySelector('.overlay');

        endBlock.classList.add('show');
        overlay.classList.add('show');
    }

    checkShip(x, y) {
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].location.length; j++) {
                if (this.data[i].location[j][0] == x && this.data[i].location[j][1] == y) {
                    this.gameModel.ships[i].hits[j] = 'hit';
                    if (this.gameModel.allShipsSunk()) {
                        this.endGame();
                    }
                    return true;
                }
            }
        }
        return false;
    }

}