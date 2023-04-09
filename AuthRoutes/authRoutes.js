
var express = require('express');
var passport = require('passport');
var router = express.Router();
const session = require('cookie-session');
var GitHubStrategy =require('passport-github2').Strategy;
const User = require('../models/user');
const ProjectsModel = require('../models/projects')
const TaskModel = require('../models/taskassigned')
const StatusModel = require('../models/status.js')
const TeamModel = require('../models/team')

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    // console.log("Session uid: ",user.id,"name ",user.name)
    cb(null, user);
  });
});

passport.deserializeUser(async (id, cb)=>{
  const user = await User.findOne({ githubId: id}).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });


  if (user) cb(null, user);
  // process.nextTick(function () {
  //   // console.log("Deserial : ",user)
  //   cb(null, user);
  // });
});
passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  // callbackURL: 'http://localhost:8080/oauth2/redirect/google',
  callbackURL: 'http://127.0.0.1:8080/auth/github/callback',
  // passReqToCallback: true,
  scope: ['profile'],
}, async (accessToken, refreshToken, profile, done) => {
  // return done(null, {accessToken, profile});

  // console.log("Access Token : ",accessToken)
  try {
    const user = await User.findOne({ provider: 'github', githubId: profile.id});
    if (!user) {
      const newUser = new User({
        
        
        provider: 'github',
        githubId: profile.id,
        name:profile.username,
        accessToken:accessToken,
        
      });
      await newUser.save();
      // console.log(accessToken)
      return done(null, newUser);
    } else {
      const existingUser = await User.findOne({githubId:profile.id});
      if (!user) {
        return done(null, false);
      }
      return done(null, existingUser);
    }
  } catch (err) {
    return done(err);
  }
}));

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));
  
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login'}),
  function(req, res) {
    res.redirect('http://localhost:3000');
    // res.send(req.user);
    router.get("/user", (req1, res)=>{
      // console.log(req.user)
      res.send(req.user)
  
      
    });

  
    
});

// router.get("/user", (req, res)=>{
//   // console.log(req.user.name)
//   // console.log(req)

  
// });

// router.get('/logout', function (req, res) {
//   req.session.destroy(function (err) {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Logout failed');
//     } else {
//       res.clearCookie('connect.sid');
//       res.redirect('http://localhost:3000/login');
//     }
//   });

// });


router.get('/logout', async (req, res)=> {
  try {
    const findToken = await User.findOneAndDelete({accessToken:req.headers.authorization});
    
    if (!findToken) {
      return res.status(404).json({ message: "User not revoked" });
    }
    if(findToken){

      res.send("Logout")
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});







  // router.get('/access', 
  // passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login'}),
  // function(req, res) {
  //   res.send(req.user.accessToken)
  //   console.log("Token "+ req.user.accessToken);

  // });

  // const revokeToken = async (accessToken, clientId, clientSecret) => {
  //   const url = `https://api.github.com/applications/${clientId}/tokens/${accessToken}`;
  //   const auth = {
  //     username: clientId,
  //     password: clientSecret,
  //   };
  //   try {
  //     await axios.delete(url, { auth });
  //     console.log('Access token revoked successfully.');
  //   } catch (err) {
  //     console.error('Failed to revoke access token:', err.message);
  //   }
  // };

  // router.get("/logout", async (req, res) => {
  //   const accessToken = req.session.accessToken;
  //   const clientId = process.env.GITHUB_CLIENT_ID;
  //   const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    
  //   try {
  //     await revokeToken(accessToken, clientId, clientSecret);
  //     console.log('Access token revoked successfully.');
  //   } catch (err) {
  //     console.error('Failed to revoke access token:', err.message);
  //   }
    
  //   req.session = null;
  //   req.logout();
  
  //   res.redirect(CLIENT_URL);
  // });
  

router.post("/projects",async (req, res,next) =>{

  try{
      
    const projectJIRA = new ProjectsModel({
        name: req.body.name,
        industry: req.body.industry,
        projectId:req.body.projectId,
        issueDate:req.body.issueDate,
        deadline:req.body.deadline,
    });

      

  const projectJIRAFind = await ProjectsModel.findOne({ projectId: req.body.projectId });
      if(projectJIRAFind){
        return res.status(404).json({message:"Project ID already exist"})

      }
      await projectJIRA.save();
      

      res.status(201).send({
        message: "Project Added successfully"
        })
        }

catch(err){
    next("Signup error",err);
}
});
router.post("/taskassigned",async (req, res,next) =>{

  try{
      
    const taskJIRA = new TaskModel({
        empname: req.body.empname,
        email:req.body.email,
        projectId:req.body.projectId,
        assignedDate:req.body.assignedDate,
        deadline:req.body.deadline,
    });

      

  const taskJIRAFind = await TaskModel.findOne({ email: req.body.email });
      if(taskJIRAFind){
        return res.status(404).json({message:"Email already exist"})

      }
      await taskJIRA.save();
      

      res.status(201).send({
        message: "Task assigned successfully"
        })
        }

catch(err){
    next("Assigned error",err);
}
});

router.post("/projectstatus",async (req, res,next) =>{

  try{
      
    const statusJIRA = new StatusModel({
        projectname: req.body.projectname,
        industry:req.body.industry,
        projectId:req.body.projectId,
        completedDate:req.body.completedDate,
        completedBy:req.body.completedBy,
    });

      

  const statusJIRAFind = await StatusModel.findOne({ projectId: req.body.projectId });
      if(statusJIRAFind){
        return res.status(404).json({message:"Project already exist"})

      }
      await statusJIRA.save();
      

      res.status(201).send({
        message: "Status successfully added"
        })
        }

catch(err){
    next("Status error",err);
}
});

router.post("/jirateam",async (req, res,next) =>{

  try{
      
    const teamJIRA = new TeamModel({
        teamName: req.body.teamName,
        teamId:req.body.teamId,
        teamMembers:req.body.teamMembers,
    });

      

  const teamJIRAFind = await TeamModel.findOne({ teamId: req.body.teamId });
      if(teamJIRAFind){
        return res.status(404).json({message:"Team already exist"})

      }
      await teamJIRA.save();
      

      res.status(201).send({
        message: "Team successfully added"
        })
        }

catch(err){
    next("Team error",err);
}
});


router.get("/projects",async (req, res,next) =>{
  

  try {
    const findToken = await User.findOne({accessToken:req.headers.authorization});
    
    if (!findToken) {
      return res.status(404).json({ message: "User not authorized." });
    }
    if(findToken){
    const projectData = await ProjectsModel.find({});

      res.send(projectData)
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/taskassigned",async (req, res,next) =>{
  try {
    const findToken = await User.findOne({accessToken:req.headers.authorization});
    
    if (!findToken) {
      return res.status(404).json({ message: "User not authorized." });
    }
    if(findToken){
      const projectTask = await TaskModel.find({});
      res.send(projectTask)
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/projectstatus",async (req, res,next) =>{
  try {

    const findToken = await User.findOne({accessToken:req.headers.authorization});
    
    if (!findToken) {
      return res.status(404).json({ message: "User not authorized." });
    }
    if(findToken){
      const projectStatus = await StatusModel.find({});

      res.send(projectStatus)
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});


router.get("/jirateam",async (req, res,next) =>{
  try {

    const findToken = await User.findOne({accessToken:req.headers.authorization});
  
    if (!findToken) {
      return res.status(404).json({ message: "User not authorized." });
    }
    if(findToken){
      const projectTeam = await TeamModel.find({});
      res.send(projectTeam)
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});


router.get("/",function(req, res){
  console.log("Login Successfully")
  // res.send("Login Successfully")
})
module.exports = router;
