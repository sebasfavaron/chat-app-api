var countADNStrings = 0;
var dnaMatrix = [];
var matrixLenght = 0;
var visited = {
    x: [],
    y: [],
    lr: [],
    rl: []
};

function validateDNA(dnaOriginal) {
    let responseMutant = true;
    let matrix = [];
    if (dnaOriginal.length > 0) {
        for (let indexRow in dnaOriginal) {
            // check row length
            if (dnaOriginal[indexRow].length != dnaOriginal.length) {
                responseMutant = false;
                matrix = undefined;
                break;
            } else {
                let arrayRow = dnaOriginal[indexRow].split('');
                for (let indexCol in arrayRow) {
                    if (!checkLetters(arrayRow[indexCol])) {
                        responseMutant = false;
                        matrix = undefined;
                        break;
                    }
                }
                if (responseMutant) {
                    matrix.push(arrayRow);
                } else {
                    responseMutant = false;
                    break;
                }

            }
        }
    } else {
        matrix = undefined;
    }
    return matrix;
}

function isMutant(dnaOriginal) {

    visited = {
        x: [],
        y: [],
        lr: [],
        rl: []
    };
    countADNStrings = 0;
    dnaMatrix = validateDNA(dnaOriginal);

    if (dnaMatrix == undefined) return undefined;

    matrixLenght = dnaMatrix.length;

    // Check combinations
    for (let indexRow in dnaMatrix) {
        if (countADNStrings < 2) {
            let dnaRow = dnaMatrix[indexRow];
            for (let indexCol in dnaRow) {
                if (countADNStrings < 2) {
                    checkDNA(parseInt(indexRow), parseInt(indexCol));
                } else {
                    break;
                }
            }
        } else {
            break;
        }
    }

    return (countADNStrings > 1);
}

function checkLetters(letter) {
    return (letter == 'A' || letter == 'T' || letter == 'C' || letter == 'G')
}

function checkDNA(x, y) {
    let letter = dnaMatrix[x][y];

    // Horizontal
    if ((y + 3) < matrixLenght && !checkVisited([x, y], 'x') && countADNStrings < 2) {
        if (letter == dnaMatrix[x][y + 1] &&
            letter == dnaMatrix[x][y + 2] &&
            letter == dnaMatrix[x][y + 3]) {

            let coords = [[x, y], [x, y + 1], [x, y + 2], [x, y + 3]];
            if (!checkVisited([x, y + 1], 'x') &&
                !checkVisited([x, y + 2], 'x') &&
                !checkVisited([x, y + 3], 'x')) {
                countADNStrings++;
                setVisited(coords, 'x');
            }
        }
    }

    // Vertical
    if ((x + 3) < matrixLenght && !checkVisited([x, y], 'y') && countADNStrings < 2) {
        if (letter == dnaMatrix[x + 1][y] &&
            letter == dnaMatrix[x + 2][y] &&
            letter == dnaMatrix[x + 3][y]) {

            let coords = [[x, y], [x + 1, y], [x + 2, y], [x + 3, y]];
            if (!checkVisited([x + 1, y], 'y') &&
                !checkVisited([x + 2, y], 'y') &&
                !checkVisited([x + 3, y], 'y')) {
                countADNStrings++;
                setVisited(coords, 'y');
            }
        }
    }
    //Oblicuo L-R
    if ((x + 3) < matrixLenght && (y + 3) < matrixLenght && !checkVisited([x, y], 'lr') && countADNStrings < 2) {
        if (letter == dnaMatrix[x + 1][y + 1] &&
            letter == dnaMatrix[x + 2][y + 2] &&
            letter == dnaMatrix[x + 3][y + 3]) {

            let coords = [[x, y], [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]];

            if (!checkVisited([x + 1, y + 1], 'lr') &&
                !checkVisited([x + 2, y + 2], 'lr') &&
                !checkVisited([x + 3, y + 3], 'lr')) {
                countADNStrings++;
                setVisited(coords, 'lr');
            }
        }
    }
    //Oblicuo R-L
    if (y >= 3 && (x + 3) < matrixLenght && !checkVisited([x, y], 'rl') && countADNStrings < 2) {
        if (letter == dnaMatrix[x + 1][y - 1] &&
            letter == dnaMatrix[x + 2][y - 2] &&
            letter == dnaMatrix[x + 3][y - 3]) {

            let coords = [[x, y], [x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3]];
            if (!checkVisited([x + 1, y - 1], 'rl') &&
                !checkVisited([x + 2, y - 2], 'rl') &&
                !checkVisited([x + 3, y - 3], 'rl')) {
                countADNStrings++;
                setVisited(coords, 'rl');
            }
        }
    }
}

function checkVisited(coords, axis) {
    switch (axis) {
        case 'x':
            return visited.x.find(oneDuple => oneDuple[0] == coords[0] &&
                oneDuple[1] == coords[1]) ?
                true : false;
        case 'y':
            return visited.y.find(oneDuple => oneDuple[0] == coords[0] &&
                oneDuple[1] == coords[1]) ?
                true : false;
        case 'lr':
            return visited.lr.find(oneDuple => oneDuple[0] == coords[0] &&
                oneDuple[1] == coords[1]) ?
                true : false;
        case 'rl':
            return visited.rl.find(oneDuple => oneDuple[0] == coords[0] &&
                oneDuple[1] == coords[1]) ?
                true : false;
    }
}

function setVisited(coords, axis) {
    switch (axis) {
        case 'x':
            visited.x.push(coords[0], coords[1], coords[2], coords[3]);
            break;
        case 'y':
            visited.y.push(coords[0], coords[1], coords[2], coords[3]);
            break;
        case 'lr':
            visited.lr.push(coords[0], coords[1], coords[2], coords[3]);
            break;
        case 'rl':
            visited.rl.push(coords[0], coords[1], coords[2], coords[3]);
            break;
    }
}

module.exports = { isMutant };