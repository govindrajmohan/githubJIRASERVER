const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const statusSchema = new Schema(
    {
        projectname: {
            type: String,
            required: [true, 'Name is required'],
        },
        industry: {
            type: String,
            unique: [true, 'email is already exists'],
            lowercase: true,
            trim: true,
        },
        projectId:{
            type:String,
            
        },
        completedDate:{
            type: Date,
            required:true,
        },
        completedBy:{
            type:String,
            required:true,
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('status', statusSchema);  
