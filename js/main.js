import { Controller } from "./components/controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const controller = new Controller('.board');
    controller.startGame();


    const tryAgainButton = document.querySelector('.end button');

    tryAgainButton.addEventListener('click', () => {
        location.reload(); 
    });
});