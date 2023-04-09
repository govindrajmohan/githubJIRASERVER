// const ProjectsModel = require('../models/projects')


// exports.projects = async ( req, res,next)=> {

//     try{
      
//         const projectJIRA = new ProjectsModel({
//             name: req.body.name,
//             industry: req.body.industry,
//             projectId:req.body.projectId,
//             issueDate:req.body.issueDate,
//             deadline:req.body.deadline,
//         });
  
          
  
//       const projectJIRAFind = await Projects.findOne({ projectId: req.body.projectId });
//           if(projectJIRAFind){
//             return res.status(404).json({message:"Project ID already exist"})
  
//           }
//           await projectJIRA.save();
          
  
//           res.status(201).send({
//             message: "User Registered successfully"
//             })
//             }
  
//     catch(err){
//         next("Signup error",err);
//     }
//   }; 
  