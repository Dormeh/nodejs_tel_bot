const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        index: true,
    },
    text: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
    }
});

const History = mongoose.model('History', schema);

module.exports = History;
