const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const projectsSchema = new Schema(
    {
        name: {
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
        
        issueDate: {
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

module.exports = mongoose.model('projects', projectsSchema);  
