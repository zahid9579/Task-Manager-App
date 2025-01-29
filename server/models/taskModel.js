const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'complete'],
        default: 'pending'
    },

    user: {  
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },

    createdAt: {
        type: Date,
        default: Date.now  
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
