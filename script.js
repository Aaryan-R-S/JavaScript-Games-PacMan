document.addEventListener('DOMContentLoaded', () => {
    const game = document.getElementById('game')
    const text = document.getElementById('text')
    const audioS = new Audio('start.mp3')
    const audioG = new Audio('game.mp3')
    const audioD = new Audio('death.mp3')
    const width = 28
    const grid = document.querySelector('.grid')
    const directions = [-1, +1, +width, -width]
    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]
    const squares = []

    //Create board
    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)

            //Add layout to the board
            if (layout[i] === 1) {
                squares[i].classList.add('wall')
            }
        }
    }
    createBoard()

    setTimeout(() => {
        audioS.play()
        audioS.loop = true
    }, 500)

    // Draw pacman
    let pacmanCurrentIndex = 502
    squares[pacmanCurrentIndex].classList.add('pac-man')

    // Draw blinky
    let blinkyCurrentIndex = 197
    squares[blinkyCurrentIndex].classList.add('blinky')

    //Gets coordinates of pacman & blinky
    function getCoordinates(index) {
        return [index % width, Math.floor(index / width)]
    }
    // console.log(getCoordinates(502));

    game.addEventListener('click', () => {
        audioS.pause()
        audioS.currentTime = 0
        audioG.play()
        audioG.loop = true
        game.innerHTML = 'Restart Game!'

        game.addEventListener('click', () => {
            location.reload()
        })

        // Move Blinky
        function moveBlinky() {
            let direction = directions[Math.floor(Math.random() * directions.length)]

            let ghostTimerId = NaN
            ghostTimerId = setInterval(() => {

                if (!squares[blinkyCurrentIndex + direction].classList.contains('wall')) {

                    //Remove ghost class
                    squares[blinkyCurrentIndex].classList.remove('blinky')

                    // check if new space is closed
                    const [blinkyX, blinkyY] = getCoordinates(blinkyCurrentIndex)
                    const [blinkyNewX, blinkyNewY] = getCoordinates(blinkyCurrentIndex + direction)
                    const [pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex)

                    function isXCoordCloser() {
                        if (Math.abs(blinkyNewX - pacmanX) < Math.abs(blinkyX - pacmanX)) {
                            return true
                        } else return false
                    }

                    function isYCoordCloser() {
                        if (Math.abs(blinkyNewY - pacmanY) < Math.abs(blinkyY - pacmanY)) {
                            return true
                        } else return false
                    }

                    if (isXCoordCloser() || isYCoordCloser()) {
                        blinkyCurrentIndex += direction
                        squares[blinkyCurrentIndex].classList.add('blinky')
                    }
                    else {
                        squares[blinkyCurrentIndex].classList.add('blinky')
                        direction = directions[Math.floor(Math.random() * directions.length)]
                    }

                    squares[blinkyCurrentIndex].classList.add('blinky')
                }
                else {
                    direction = directions[Math.floor(Math.random() * directions.length)]
                }

                // stop Game pacman is eaten
                if (squares[blinkyCurrentIndex].classList.contains('pac-man')) {
                    clearInterval(ghostTimerId)
                    audioG.pause()
                    audioG.currentTime =0
                    audioD.play()
                    game.innerHTML = 'Play Again!'
                    text.style.right = '310px'
                    text.innerHTML = 'You Lose!'
                    setTimeout(() => {
                        audioS.play()
                        audioS.loop = true
                    }, 1500)
                }
            }, 300);
            document.addEventListener('keydown', () => {
                clearInterval(ghostTimerId)
            })
        }
        moveBlinky()


        // Move Pacman
        document.onkeydown = (e) => {
            // w up 
            if (e.keyCode == 38 || e.keyCode == 87) {
                let dir = directions[3]
                if (!squares[pacmanCurrentIndex + dir].classList.contains('wall')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex += dir
                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    moveBlinky()
                }
            }
            // d right
            if (e.keyCode == 39 || e.keyCode == 68) {
                let dir = directions[1]
                if (!squares[pacmanCurrentIndex + dir].classList.contains('wall')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex += dir
                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    moveBlinky()
                }
            }
            // a left
            if (e.keyCode == 37 || e.keyCode == 65) {
                let dir = directions[0]
                if (!squares[pacmanCurrentIndex + dir].classList.contains('wall')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex += dir
                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    moveBlinky()
                }
            }
            // s down
            if (e.keyCode == 40 || e.keyCode == 83) {
                let dir = directions[2]
                if (!squares[pacmanCurrentIndex + dir].classList.contains('wall')) {
                    squares[pacmanCurrentIndex].classList.remove('pac-man')
                    pacmanCurrentIndex += dir
                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    moveBlinky()
                }
            }
        }
    })

})

