const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email invalid') 
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate (value) {
            if (value.toLowerCase().includes('password'))
                throw new Error('weak passwd')
        }
    },
    age: {
        type: Number,
        default: 0,
        validate (value) {
            if (value < 0) {
                throw new Error('Age must be positive')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
    this.tokens.push({token})
    await this.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Email does not exist')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Wrong password')
    }
    return user
}

//hash password
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//delete tasks when removed
userSchema.pre('remove', async function (next) {
    await Task.deleteMany({owner: this._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User