const mongoose = require('mongoose')

const toDoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 5
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('toDo', toDoSchema)
