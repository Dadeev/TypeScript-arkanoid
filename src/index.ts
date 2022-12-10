import { CanvasView } from './view/CanvasView';
import { Ball } from './sprites/Ball';
import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY
} from './setup';

let score = 0;
let gameOver = false;

function setGameOver(view: CanvasView) {
    view.drawInfo('Game Over!')
    gameOver = false;
}

function setGameWin(view: CanvasView) {
    view.drawInfo('Game Won!')
    gameOver = false;
}