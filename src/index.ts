import {CanvasView} from './view/CanvasView';
import {Ball} from './sprites/Ball';
import {Brick} from './sprites/Brick';
import {Paddle} from './sprites/Paddle';
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
import {createBricks} from "~/helper";

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

function gameLoop(
    view: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    // ball: Ball,
) {
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);

    //Move paddle and check that it won't exit the playfield
    if (
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
    ) {
        paddle.movePaddle();
    }

    requestAnimationFrame(() => gameLoop(view, bricks, paddle))
}

function startGame(view: CanvasView) {
    //Reset displays
    score = 0;
    view.drawInfo('');
    view.drawScore(0)

    //Create all bricks
    const bricks = createBricks();
    //Create the Paddle
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT},
        PADDLE_IMAGE
    )

    gameLoop(view, bricks, paddle)
}

const view = new CanvasView('#playField')
view.initStartButton(startGame)