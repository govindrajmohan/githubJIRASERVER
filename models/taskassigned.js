const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types


const taskSchema = new Schema(
    {
        empname: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            unique: [true, 'email is already exists'],
            lowercase: true,
            trim: true,
        },
        projectId:{
            type:String,
            required:true,
        },
        
        assignedDate: {
            type: Date,
            required:true,
        },
        deadline: {
            type: Date,
            required:true,
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('task', taskSchema);  
