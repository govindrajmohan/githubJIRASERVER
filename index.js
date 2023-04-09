const cors = require('cors'),
express = require('express')
var session = require('express-session');
const mongoose = require('mongoose');
var passport = require('passport');
require('dotenv').config();
var authRouter = require('./AuthRoutes/authRoutes');
const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongodb://127.0.0.1:27017/jira
// 'mongodb+srv://govindmohan144:CsMySeVBkLggb39J@clusterinstaclone.eruplhp.mongodb.net/?retryWrites=true&w=majority',
try {
    mongoose.connect('mongodb+srv://govindmohan144:CsMySeVBkLggb39J@clusterinstaclone.eruplhp.mongodb.net/?retryWrites=true&w=majority',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
} catch (error) {
    console.log("Database connectivity error : ", error)
}


app.use(session({
    secret: 'MERN03',
    path: '/',
    resave: false,
    saveUninitialized: false,
    maxAge: 60*1000,
    httpOnly: true,
    cookie: { secure: false}
   
    // store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/GoogleAuthTesting' })
}));
// app.use(
//     cookieSession({ name: "session", keys: 'MERN03', maxAge: 24 * 60 * 60 * 100 })
//   );

// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: 'MERN03',
// }))

app.use(passport.initialize());
app.use(passport.session());

process.on(
    'UnhandledRejection', error => {
                console.log("Uncaught error found : ", error)}
);



app.use('/', authRouter);


app.listen(process.env.PORT || 8080, () => console.log(`Server running on port: http://localhost:${process.env.PORT}`))
