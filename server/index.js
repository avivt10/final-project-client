require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var cors = require("cors");
app.use(cors());
app.use(express.json());
console.log("token key = ", 'aviv');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  let token =undefined
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
     let bearerToken = bearer[1];
     token =bearerToken
  }

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log("config.TOKEN_KEY", 'aviv');
    const decoded = jwt.verify(token, 'aviv');
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token!");
  }
  return next();
};



const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/project")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("there was error", err));

//Collection definition
const studentsSchema = new mongoose.Schema({
  name: String,
  family: String,
  age: Number,
});


const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  foods:{type:Object},
  token: { type: String },
});
const User = mongoose.model("user", userSchema);

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

app.post("/users/register", async (req, res) => {
console.log(req.user) 
  try {
    // Get user input
    console.log(req.body);
    let { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name) ) {
      console.log("There was error");
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    email = email.toLowerCase();
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
     "aviv",
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    console.log("current user to return ", user);
    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
  // Our register logic ends here
});
app.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    let { email, password } = req.body;

    //בדיקה אם הם ריקים 
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    // בדיקה אם המייל והסיסמא אחרי הצפנה הם של אותו משתמש
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        "aviv",
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(401).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});


app.post('/updateFood',verifyToken, async (req,res)=>{
   console.log('in get');
   console.log(req.user.user_id);
  let foodObject={
    'sunday':req.body[0],
    'monday':req.body[1],
    'thuesday':req.body[2],
    'wednesday':req.body[3],
    'thursday':req.body[4]
  }
  User.findOne({_id: req.user.user_id}, function(err, user) {
    if(!err) {
        user.foods = foodObject
        user.save(function(err) {
            if(!err) {
                console.log(`new user \n${user}`);
            }
            else {
                console.log("Error: could not save user " +user);
            }
        });
    }
});
})
app.get('/date',(req,res)=>{
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   res.send(date)
})
app.delete('/delete',async (req,res)=>{
  console.log('in delete ');
  try {
    // Get user input
    let { email, password } = req.query;
    console.log(`email=${email}`);
    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    email = email.toLowerCase();
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      User.deleteOne({
        _id: user._id,
         email: email
      }, function (err, user) {
        if (err)
            console.error(err);

        console.log('User successfully removed from polls collection!');
       return  res.status(200).send();


      });
      
    }
    else{
      return res.status(401).send("Invalid Credentials");
    }
   
  } catch (err) {
    console.log(err);
  }
})
const port = process.env.PORT || 2021;
app.listen(port, () => {
  console.log(`listening on ${port} port`);
});
