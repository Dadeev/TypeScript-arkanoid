import {Brick} from './sprites/Brick';
import {
    BRICK_IMAGES,
    LEVEL,
    STAGE_COLS,
    STAGE_PADDING,
    BRICK_WIDTH,
    BRICK_HEIGHT,
    BRICK_PADDING,
    BRICK_ENERGY
} from './setup';

export function createBricks(): Brick[] {
    return LEVEL.reduce((acc, currVal, i) => {
        const row = Math.floor((i + 1) / STAGE_COLS);
        const col = i % STAGE_COLS;

        const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
        const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

        if (currVal === 0) return acc;

        return [
            ...acc,
            new Brick(
                BRICK_WIDTH,
                BRICK_HEIGHT,
                {x, y},
                BRICK_ENERGY[currVal],
                BRICK_IMAGES[currVal]
            )
        ]
    }, [] as Brick[])
}