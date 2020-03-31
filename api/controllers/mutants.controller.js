// const Stats = require('../models/product.model');
// const mongoose = require('mongoose');

class MutantsController {
    static async checkMutant(req, res, next) {
        // try {
        //     let products = Product.find({});
        //     console.log(req.query);
        //     products = apiController.APIController.checkParams(products, req.query);
        //     const productsResult = await products.exec();
        //     res.status(200).json({
        //         message: 'Handling GET requests to /products',
        //         result: productsResult
        //     });
        //   } catch (err) {
        //     res.status(500).json({
        //         message: err.message
        //     });
        //   }

        // console.log(req.body);

        // try {
            const mutantDNA = req.body.dna;

            console.log(mutantDNA);

            if (isMutant(mutantDNA)) {
                res.status(200).json({
                    message: 'Handling GET requests to /mutants',
                    result: 'OK'
                });
            } else {
                res.status(403).json({
                    message: 'error'
                });
            }

        // } catch (error) {
        //     res.status(403).json({
        //         message: error.message
        //     });
        // }
    }

    static async getMutantsStats(req, res, next) {
        // try {
        //     let products = Product.find({});
        //     console.log(req.query);
        //     products = apiController.APIController.checkParams(products, req.query);
        //     const productsResult = await products.exec();
        //     res.status(200).json({
        //         message: 'Handling GET requests to /products',
        //         result: productsResult
        //     });
        //   } catch (err) {
        //     res.status(500).json({
        //         message: err.message
        //     });
        //   }

        res.status(200).json({
            message: 'Handling GET requests to /stats',
            result: 'OK'
        });


    }
}

var visited = [];
var countADNStrings = 0;
var dnaMatrix = [];
var matrixLenght = 0;

function isMutant(dnaOriginal) {

    visited = [];
    countADNStrings = 0;

    var responseMutant = true;

    dnaMatrix = [];
    matrixLenght = 0;

    //se chequean las longitudes de los arrays y las letras

    for (let indexRow in dnaOriginal) {
        if (dnaOriginal[indexRow].length != dnaOriginal.length) {
            console.error('row false length!');
            responseMutant = false;
            break;
        } else {
            let arrayRow = dnaOriginal[indexRow].split('');
            for (let indexCol in arrayRow) {
                if (!checkLetters(arrayRow[indexCol])) {
                    console.error('letter false!');
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

    console.log('DNA Matrix: ', dnaMatrix);
    matrixLenght = dnaMatrix.length;

    // Chequear las combinaciones

    for (let indexRow in dnaMatrix) {
        if (countADNStrings < 2) {
            let dnaRow = dnaMatrix[indexRow];
            for (let indexCol in dnaRow) {
                if (countADNStrings < 2) {
                    let letter = dnaRow[indexCol];
                    if (!checkVisited([indexRow, indexCol])) {
                        console.log('letra por chequear: ', letter + ' x: ' + indexRow + ' y: ' + indexCol);
                        checkDNA(parseInt(indexRow), parseInt(indexCol));
                    } else {
                        console.error('letra chequeada', letter + ' x: ' + indexRow + ' y: ' + indexCol);
                    }
                } else {
                    console.log('mas de una cadena');
                    responseMutant = true;
                    break;
                }
            }
        } else {
            console.log('mas de una cadena');
            responseMutant = true;
            break;
        }
    }

    return responseMutant;
}

function checkLetters(letter) {
    return (letter == 'A' || letter == 'T' || letter == 'C' || letter == 'G')
}

function checkDNA(x, y) {
    let letter = dnaMatrix[x][y];
    // console.log(typeof(x));
    // console.log(typeof(y));
    // console.log('x: '+x+ ' y: '+y);
    // console.log('comparar: ' + dnaMatrix[x][y] + ' con: '+ dnaMatrix[x][y + 1]);
    // console.log('es igual a la anterior: ', dnaMatrix[x][y] == dnaMatrix[x][y + 1]);
    // Horizontal
    if ((y + 3) < matrixLenght) {
        if (letter == dnaMatrix[x][y + 1] &&
            letter == dnaMatrix[x][y + 2] &&
            letter == dnaMatrix[x][y + 3]) {
    
                visited.push([x, y], [x, y + 1], [x, y + 2], [x, y + 3]);
                countADNStrings++;
                console.log('Se encontró una secuencia en x, visited: ', visited);
                console.log('Secuencias: ', countADNStrings);
        }
    }

    // Vertical
    if ((x + 3) < matrixLenght) {
        if (letter == dnaMatrix[x + 1][y] &&
            letter == dnaMatrix[x + 2][y] &&
            letter == dnaMatrix[x + 3][y]) {

                visited.push([x, y], [x + 1, y], [x + 2, y], [x + 3, y]);
                countADNStrings++;
                console.log('Se encontró una secuencia en y, visited: ', visited);
                console.log('Secuencias: ', countADNStrings);
        }
    }   
    //Oblicuo L-R
    if ((x + 3) < matrixLenght) {
        if (letter == dnaMatrix[x + 1][y + 1] &&
            letter == dnaMatrix[x + 2][y + 2] &&
            letter == dnaMatrix[x + 3][y + 3]) {
    
                visited.push([x, y], [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]);
                countADNStrings++;
                console.log('Se encontró una secuencia en Z L-R, visited: ', visited);
                console.log('Secuencias: ', countADNStrings);
        }
    }
    //Oblicuo R-L
    if (x >= 3 && y >= 3) {
        if (letter == dnaMatrix[x - 1][y - 1] &&
            letter == dnaMatrix[x - 2][y - 2] &&
            letter == dnaMatrix[x - 3][y - 3]) {
    
                visited.push([x, y], [x - 1, y - 1], [x - 2, y - 2], [x - 3, y - 3]);
                countADNStrings++;
                console.log('Se encontró una secuencia en Z R-L, visited: ', visited);
                console.log('Secuencias: ', countADNStrings);
        }
    }
}

function checkVisited(coords) {
    return visited.find(oneDuple => oneDuple[0] == coords[0] &&
        oneDuple[1] == coords[1]) ?
        true : false;
}


module.exports.MutantsController = MutantsController;