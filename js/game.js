/*
    Classes
*/

class Cell {
    constructor(x, y) {
        this.x_coord = x;
        this.y_coord = y;
        this.isEmpty = true;
    }
}

class Piece {
    constructor(number, x, y) {
        this.x_coord = x;
        this.y_coord = y;
        this.number = number;
    }

    move(piece) {
        let free_cell = checkAdjacency(this.x_coord, this.y_coord);    // Find a free space

        if (free_cell == null) {
            return; // If there's no free space
        }

        playPop();

        // Set new coords
        this.x_coord = free_cell.x;
        this.y_coord = free_cell.y;

        // Move HTML element (CSS animation)
        piece.classList.add(`move${free_cell.dir}`);

        // Move HTML element (Set new data)
        setTimeout(function() {
            piece.classList.remove(`move${free_cell.dir}`);

            piece.parentElement._data.isEmpty = true;
            piece.parentElement.innerHTML = '';

            free_cell.cell.appendChild(piece);
            free_cell.cell._data.isEmpty = false;
        }, 300);
        
    }
}

/*
    Functions
*/

// Assign a random number between 1 and 15
function assignRandomNumber() {
    let random_pos = Math.floor(Math.random() * (numbers.length));
    number = numbers[random_pos];
    numbers.splice(random_pos, 1);

    return number;
}

// Check if there's an empty space in the neighborhood of a piece
function checkAdjacency(x, y) {
    // Check up
    if (x - 1 > 0) {
        for (let n = 0; n < cells.length; n++) {
            if (cells[n]._data.x_coord == x - 1 && cells[n]._data.y_coord == y) {
                if (cells[n]._data.isEmpty == true) {
                    return {x: x - 1, y: y, cell: cells[n], dir: 'Up'};
                }
            }
        }
    }

    // Check down
    if (x + 1 < 5) {
        for (let n = 0; n < cells.length; n++) {
            if (cells[n]._data.x_coord == x + 1 && cells[n]._data.y_coord == y) {
                if (cells[n]._data.isEmpty == true) {
                    return {x: x + 1, y: y, cell: cells[n], dir: 'Down'};
                }
            }
        }
    }

    // Check left
    if (y - 1 > 0) {
        for (let n = 0; n < cells.length; n++) {
            if (cells[n]._data.x_coord == x && cells[n]._data.y_coord == y - 1) {
                if (cells[n]._data.isEmpty == true) {
                    return {x: x, y: y - 1, cell: cells[n], dir: 'Left'};
                }
            }
        }
    }

    // Check right
    if (y + 1 < 5) {
        for (let n = 0; n < cells.length; n++) {
            if (cells[n]._data.x_coord == x && cells[n]._data.y_coord == y + 1) {
                if (cells[n]._data.isEmpty == true) {
                    return {x: x, y: y + 1, cell: cells[n], dir: 'Right'};
                }
            }
        }
    }

    return null;
}

function playPop() {
    var audio = new Audio('../misc/pop.wav');
    audio.play();
}

/*
    Main function (Initialize the game)
*/

function setUp() {
    // Initialize the cells of the game:

    // The grid is 4x4, so:
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            let cell = document.createElement('div');   // New cell HTML element
            cell.className = 'cell';    // Cell className for styles
            cell._data = new Cell(i,j);     // Link to a JS object
            grid.appendChild(cell);     // Display
        }
    }

    cells = document.querySelectorAll('.cell');

    // Initialize the pieces of the game:

    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            if (i == 4 && j == 4) {
                break;
            }

            let piece = document.createElement('div');  // New piece HTML element
            piece.className = 'piece';  // Piece className for styles

            let number = assignRandomNumber();  // Assign a random number
            piece.textContent = number;
            piece._data = new Piece(number, i, j);  // Link JS object

            piece.setAttribute('onclick','this._data.move(this)');   // Add move method

            for (let n = 0; n < cells.length; n++) {
                if (cells[n]._data.x_coord == i && cells[n]._data.y_coord == j) {
                    cells[n].appendChild(piece);    // Put each piece in the correct place
                    cells[n]._data.isEmpty = false;
                }
            }
        }
    }
}

/*
    Main execution
*/

const grid = document.querySelector('.grid');
var cells;
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

setUp();