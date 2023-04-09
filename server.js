// const express = require("express");
// const dotenv = require("dotenv");
// const { OAuth2Client } = require("google-auth-library");
// const { MongoClient } = require("mongodb");

// dotenv.config();
// const client = new OAuth2Client(process.env.CLIENT_ID);

// const app = express();

// app.use(express.json());

// const uri = process.env.MONGODB_URI;
// const clientDB = new MongoClient(uri);

// async function upsertUser(user) {
//   const filter = { email: user.email };
//   const options = { upsert: true, returnOriginal: false };
//   const collection = clientDB.db("myapp").collection("users");
//   const result = await collection.findOneAndUpdate(filter, { $set: user }, options);
//   return result.value;
// }

// app.post("/api/google-login", async (req, res) => {
//   const { token } = req.body;
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.CLIENT_ID,
//   });

//   const { name, email, picture } = ticket.getPayload();
//   const user = await upsertUser({ name, email, picture });
//   res.status(201);
//   res.json(user);
// });



// try {
//     mongoose.connect("mongodb://127.0.0.1:27017/GoogleAuthTesting", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
//     });
//     console.log("connected to db");
//     } catch (error) {
//     handleError(error);
//     }
    
    
    
//     process.on('unhandledRejection', error => {
//     console.log('unhandledRejection', error.message);
//     });