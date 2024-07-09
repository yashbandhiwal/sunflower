const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    question:{
        type:String,
        required: true
    },
    activeRate: {
        type: Number,
        required: true
    },
    Mood: {
        type: String,
        enum: ['Rad', 'Good', 'Meh', 'Bad', 'Worst', null],
        default: null
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
