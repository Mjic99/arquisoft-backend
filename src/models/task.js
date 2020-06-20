const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task