const Mutant = require('../models/mutant.model');
const mongoose = require('mongoose');
const mutantsLib = require('../lib/mutants.lib');

class MutantsController {
    static async checkMutant(req, res, next) {
        if (req.body.dna != undefined){
            const mutantDNA = req.body.dna;
            let mutantMatrix = mutantsLib.validateDNA(mutantDNA);
            
            if (mutantMatrix != undefined) {
                let isMutantDNA = mutantsLib.isMutant(mutantMatrix);

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
            const ratio = humans > 0 ? (mutants / humans) : 0;
            
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

module.exports.MutantsController = MutantsController;