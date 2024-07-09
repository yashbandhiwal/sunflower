const mongoose = require('mongoose');

const moodActivitySchema = new mongoose.Schema({

    mood:{
        type: String,
        enum: ['Rad', 'Good', 'Meh', 'Bad', 'Worst', null],
        default: null
    },
    description: {
        type: String,
        default: 'Null',
        required: false,
        max: 100
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('moodactivity', moodActivitySchema);
