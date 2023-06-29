// import 'package:http/http.dart'  in dart
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require("./routes/auth");
const documentRouter = require("./routes/document");

// the port will be accessed through where we will deploy our or if port is not available i.e. in local development  port 3001 will assigned to it, ( | ) indicates or operation
const PORT = process.env.PORT | 3001 // since on port 3000 aur web is already running we can't run our server on it
const app = express();  // initializing express and storing in app variable just like calling a function.
app.use(cors());
app.use(express.json()); // middleWere it will convert data into json formate from client side
app.use(authRouter); // known as middleWere to manipulate the data between client and server
app.use(documentRouter);
const DB = "mongodb+srv://aditya:adityashahi@cluster1.rocl7uy.mongodb.net/?retryWrites=true&w=majority";

/* 
app.post('/api/signup')  // Route of our api e.g. localhost:3001/api/signup
now if we make a post request on this route it will execute whatever code written in callback function
call back will take request and response as a parameter with request we can access all the data which is sended by the client
and with response whatever data you want to sent can be accessed with it. 
MAKE ALL THE APIs IN THERE SEPARATE FILES
*/
// app.post('/api/signup',(req, res)=>{})


mongoose.connect(DB).then(() => {
    console.log("Connection successful!");
}).catch((err) => {
    console.log(err);
});

/*  
    Used to start the server it continuously listening the server and respond that.
    In listen method need to pass that on which port it should  start running
    0.0.0.0 means we can access this server from any ip address.
    than a callback basically means after the app is connect what we have to do now
    */
app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`);
});

