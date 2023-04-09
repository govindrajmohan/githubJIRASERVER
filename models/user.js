const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            unique: [true, 'email is already exists'],
            lowercase: true,
            trim: true,
        },
        githubId:{
            type:String,
            
        },
        password: {
            type: String,
            trim: true,
        },
        provider: {
            type: String,
        },
        subject: {
            type: String,
        },
        accessToken:{
            type:String,
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('user', userSchema);  
