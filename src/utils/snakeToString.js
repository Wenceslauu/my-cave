function snakeToString(snake) {
    return snake.split('_')
                .map((word) => word.toLowerCase())
                .join(' ')
}

export default snakeToString