const Mutant = require('../models/mutant.model');
const mongoose = require('mongoose');

class MutantsController {
    static async checkMutant(req, res, next) {
        if (req.body.dna != undefined){
            const mutantDNA = req.body.dna;
            let isMutantDNA = isMutant(mutantDNA);

            const mutant = new Mutant({
                _id: new mongoose.Types.ObjectId(),
                dna: mutantDNA,
                mutant: isMutantDNA
            });

            await mutant.save();

            if (isMutantDNA) {
                res.status(200).json({
                    message: 'Mutant',
                    result: 'OK'
                });
            } else {
                res.status(403).json({
                    message: 'Human',
                    result: 'Forbidden'
                });
            }

        } else {
            res.status(400).json({
                message: 'Bad Request'
            });
        }
    }

    static async getMutantsStats(req, res, next) {
        try {
            const mutants = await Mutant.countDocuments({
                mutant: true
            }).exec();
            const humans = await Mutant.countDocuments({
                mutant: false
            }).exec();
            const ratio = mutants / humans;
            res.status(200).json({
                count_mutant_dna: mutants,
                count_human_dna: humans,
                ratio: ratio
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}

// var visited = [];
var countADNStrings = 0;
var dnaMatrix = [];
var matrixLenght = 0;
var visited = {
    x: [],
    y: [],
    lr: [],
    rl: []
};

function isMutant(dnaOriginal) {

    visited = {
        x: [],
        y: [],
        lr: [],
        rl: []
    };
    countADNStrings = 0;
    dnaMatrix = [];
    matrixLenght = 0;

    var responseMutant = true;

    for (let indexRow in dnaOriginal) {
        if (dnaOriginal[indexRow].length != dnaOriginal.length) {
            // console.error('row false length!');
            responseMutant = false;
            break;
        } else {
            let arrayRow = dnaOriginal[indexRow].split('');
            for (let indexCol in arrayRow) {
                if (!checkLetters(arrayRow[indexCol])) {
                    // console.error('letter false!');
                    responseMutant = false;
                    break;
                }
            }
            if (responseMutant) {
                dnaMatrix.push(arrayRow);
            } else {
                responseMutant = false;
                break;
            }

        }
    }

    if (!responseMutant) return responseMutant;

    // console.log('DNA Matrix: ', dnaMatrix);
    matrixLenght = dnaMatrix.length;

    // Chequear las combinaciones

    for (let indexRow in dnaMatrix) {
        if (countADNStrings < 2) {
            let dnaRow = dnaMatrix[indexRow];
            for (let indexCol in dnaRow) {
                if (countADNStrings < 2) {
                    // if (!checkVisited([indexRow, indexCol])) {
                    //     // console.log('letra por chequear: ', letter + ' x: ' + indexRow + ' y: ' + indexCol);
                    //     checkDNA(parseInt(indexRow), parseInt(indexCol));
                    // } else {
                    //     // console.error('letra chequeada', letter + ' x: ' + indexRow + ' y: ' + indexCol);
                    // }
                    // console.log('letra por chequear: ', letter + ' x: ' + indexRow + ' y: ' + indexCol);
                    checkDNA(parseInt(indexRow), parseInt(indexCol));
                } else {
                    // console.log('mas de una cadena');
                    responseMutant = true;
                    break;
                }
            }
        } else {
            // console.log('mas de una cadena');
            responseMutant = true;
            break;
        }
    }

    if (countADNStrings < 2) responseMutant = false;

    return responseMutant;
}

function checkLetters(letter) {
    return (letter == 'A' || letter == 'T' || letter == 'C' || letter == 'G')
}

function checkDNA(x, y) {
    let letter = dnaMatrix[x][y];

    // Horizontal
    if ((y + 3) < matrixLenght && !checkVisited([x, y], 'x') && countADNStrings < 2) {
        // console.log('check horizontal');
        if (letter == dnaMatrix[x][y + 1] &&
            letter == dnaMatrix[x][y + 2] &&
            letter == dnaMatrix[x][y + 3]) {

            // if (!checkVisited([x, y + 1]) &&
            //     !checkVisited([x, y + 2]) &&
            //     !checkVisited([x, y + 3])) {
            let coords = [[x, y], [x, y + 1], [x, y + 2], [x, y + 3]];
            // if (countVisited(coords) < 2) {   
            //         visited.push([x, y], [x, y + 1], [x, y + 2], [x, y + 3]);
            //         countADNStrings++;
            //         console.log('Se encontró una secuencia en x, visited: ', visited);
            //         console.log('Secuencias: ', countADNStrings);
            // }
            // countADNStrings++;
            // console.log('Se encontró una secuencia en x, visited: ', [[x, y], [x, y + 1], [x, y + 2], [x, y + 3]]);
            // console.log('Secuencias: ', countADNStrings);
            if (!checkVisited([x, y + 1], 'x') &&
                !checkVisited([x, y + 2], 'x') &&
                !checkVisited([x, y + 3], 'x')) {
                countADNStrings++;
                setVisited(coords, 'x');
                // console.log('Se encontró una secuencia en x, visited: ', visited);
                // console.log('Secuencias: ', countADNStrings);
            }
        }
    }

    // Vertical
    if ((x + 3) < matrixLenght && !checkVisited([x, y], 'y') && countADNStrings < 2) {
        // console.log('check vertical');
        if (letter == dnaMatrix[x + 1][y] &&
            letter == dnaMatrix[x + 2][y] &&
            letter == dnaMatrix[x + 3][y]) {

            // if (!checkVisited([x + 1, y]) &&
            //     !checkVisited([x + 2, y]) &&
            //     !checkVisited([x + 3, y])) {
            let coords = [[x, y], [x + 1, y], [x + 2, y], [x + 3, y]];
            // if (countVisited(coords) < 2) {           
            //         visited.push([x, y], [x + 1, y], [x + 2, y], [x + 3, y]);
            //         countADNStrings++;
            //         console.log('Se encontró una secuencia en y, visited: ', visited);
            //         console.log('Secuencias: ', countADNStrings);
            // }

            if (!checkVisited([x + 1, y], 'y') &&
                !checkVisited([x + 2, y], 'y') &&
                !checkVisited([x + 3, y], 'y')) {
                countADNStrings++;
                setVisited(coords, 'y');
                // console.log('Se encontró una secuencia en y, visited: ', visited);
                // console.log('Secuencias: ', countADNStrings);
            }
        }
    }
    //Oblicuo L-R
    if ((x + 3) < matrixLenght && (y + 3) < matrixLenght && !checkVisited([x, y], 'lr') && countADNStrings < 2) {
        // console.log('check oblicuo l-r');
        if (letter == dnaMatrix[x + 1][y + 1] &&
            letter == dnaMatrix[x + 2][y + 2] &&
            letter == dnaMatrix[x + 3][y + 3]) {

            // if (!checkVisited([x + 1, y + 1]) &&
            //     !checkVisited([x + 2, y + 2]) &&
            //     !checkVisited([x + 3, y + 3])) { 
            let coords = [[x, y], [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]];
            // if (countVisited(coords) < 2) {       
            //         visited.push([x, y], [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]);
            //         countADNStrings++;
            //         console.log('Se encontró una secuencia Oblicua L-R, visited: ', visited);
            //         console.log('Secuencias: ', countADNStrings);
            // }
            if (!checkVisited([x + 1, y + 1], 'lr') &&
                !checkVisited([x + 2, y + 2], 'lr') &&
                !checkVisited([x + 3, y + 3], 'lr')) {
                countADNStrings++;
                setVisited(coords, 'lr');
                // console.log('Se encontró una secuencia Oblicua L-R, visited: ', visited);
                // console.log('Secuencias: ', countADNStrings);
            }
        }
    }
    //Oblicuo R-L
    if (y >= 3 && (x + 3) < matrixLenght && !checkVisited([x, y], 'rl') && countADNStrings < 2) {
        // console.log('check oblicuo r-l');
        if (letter == dnaMatrix[x + 1][y - 1] &&
            letter == dnaMatrix[x + 2][y - 2] &&
            letter == dnaMatrix[x + 3][y - 3]) {

            // if (!checkVisited([x + 1, y - 1]) &&
            //     !checkVisited([x + 2, y - 2]) &&
            //     !checkVisited([x + 3, y - 3])) { 
            let coords = [[x, y], [x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3]];
            // if (countVisited(coords) < 2) {      
            //         visited.push([x, y], [x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3]);
            //         countADNStrings++;
            //         console.log('Se encontró una secuencia Oblicua R-L, visited: ', visited);
            //         console.log('Secuencias: ', countADNStrings);
            // }
            if (!checkVisited([x + 1, y - 1], 'rl') &&
                !checkVisited([x + 2, y - 2], 'rl') &&
                !checkVisited([x + 3, y - 3], 'rl')) {
                countADNStrings++;
                setVisited(coords, 'rl');
                // console.log('Se encontró una secuencia Oblicua R-L, visited: ', visited);
                // console.log('Secuencias: ', countADNStrings);
            }
        }
    }
}

function checkVisited(coords, axis) {
    // console.log('visited array: ', visited);
    // console.log('coords: ', coords);
    // return visited.find(oneDuple => oneDuple[0] == coords[0] &&
    //     oneDuple[1] == coords[1]) ?
    //     true : false;
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

// function countVisited(coords) {
//     console.log('coords count: ', coords);
//     let counter = 0;

//     if (checkVisited(coords[0])) {
//         counter++;
//     }
//     if (checkVisited(coords[1])) {
//         counter++;
//     }
//     if (checkVisited(coords[2])) {
//         counter++;
//     }
//     if (checkVisited(coords[3])) {
//         counter++;
//     }

//     console.log('counter: ', counter);
//     return counter;
// }


module.exports.MutantsController = MutantsController;