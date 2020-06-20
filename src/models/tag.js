const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
})

tagSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'tags'
})

const Task = mongoose.model('Tag', tagSchema)

module.exports = Task