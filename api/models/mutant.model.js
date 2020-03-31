const mongoose = require('mongoose');

const mutantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dna: [String],
    mutant: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Mutant', mutantSchema);