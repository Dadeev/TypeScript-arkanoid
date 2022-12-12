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
import {Collision} from "~/Collision";

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
    ball: Ball,
    collision: Collision
) {
    view.clear();
    view.drawBricks(bricks);
    view.drawSprite(paddle);
    view.drawSprite(ball);

    //Move ball
    ball.moveBall()

    //Move paddle and check that it won't exit the playfield
    if (
        (paddle.isMovingLeft && paddle.pos.x > 0) ||
        (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
    ) {
        paddle.movePaddle();
    }

    collision.checkBallCollision(ball, paddle, view);
    const collidingBrick = collision.isCollidingBricks(ball, bricks);

    if (collidingBrick) {
        score += 1;
        view.drawScore(score)
    }

    requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision))
}

function startGame(view: CanvasView) {
    //Reset displays
    score = 0;
    view.drawInfo('');
    view.drawScore(0)

    //Create a collision instance
    const collision = new Collision();
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
    //Create the Ball
    const ball = new Ball(
        BALL_SPEED,
        BALL_SIZE,
        {x: BALL_STARTX, y: BALL_STARTY},
        BALL_IMAGE
    )

    gameLoop(view, bricks, paddle, ball, collision)
}

const view = new CanvasView('#playField')
view.initStartButton(startGame)