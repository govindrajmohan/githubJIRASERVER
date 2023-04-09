const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const teamSchema = new Schema(
    {
        teamName: {
            type: String,
            required: [true, 'Team Name is required'],
        },
        teamId:{
            type:String,
            required: [true, 'TeamID is required'],
            unique:true,

        },
        teamMembers:{
            type:String,
            required:true,
        },
        
        
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('teams', teamSchema);  
