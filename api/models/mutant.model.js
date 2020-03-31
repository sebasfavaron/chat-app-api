const mongoose = require('mongoose');

const mutantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String
}, { timestamps: true });

module.exports = mongoose.model('Mutant', mutantSchema);