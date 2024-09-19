const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
// const passport = require('passport');

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);
const { SanitizedUser } = require("../services/common");
const passport = require("passport");

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });

        const response = await user.save();

        req.login(SanitizedUser(response), (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(SanitizedUser(response), privateKey, {
              algorithm: "RS256",
            });
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                secure: false,
                httpOnly: true
              })
              .status(201)
              .json(token);
          }
        });
        // res
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res, next) => {
  // try {
  //   const user = await User.findOne({email:req.body.email}).exec();

  //   if(!user){
  //     res.status(401).json({message:'no such user exists'});
  //   }

  //   else if(user.password === req.body.password ){

  //       res.status(201).json({id:user.id, email:user.email, addresses:user.addresses, name:user.name});
  //   }
  //   else{

  //       res.status(401).json({message:'Invalid Credentials'});
  //   }
  // } catch (err) {
  //   console.log(err);
  //   res.status(400).json(err);
  // }
  // res.json(req.user)
  // console.log(req.user.token);
  // res.cookie('jwt', req.user.token,  { expires: new Date(Date.now() + 3600000), secure:false, sameSite:'none', path:'/', domain: 'http://localhost:3000'})
  // .status(201).json(req.user.token);


  passport.authenticate('local', async ( err, user, info)=>{

    if (err) {
      // If there's an error (e.g., database error), return server error
      return res.status(500).json({ message: 'Server error' });
    }

    if(!user){
      return res.status(401).json({message: info.message});
    }


    // req.login(token, (err)=>{

    //   if(err){
    //     return res.status(500).json({ message: 'Login failed' });
    //   }

    //   return res
    //   .cookie("jwt", req.user.token, {
    //     expires: new Date(Date.now() + 3600000),
    //     secure: false,
    //     httpOnly: true
    //   })
    //   .status(201)
    //   .json(req.user.token);

    // })(req, res, next);

    
        const token = jwt.sign(SanitizedUser(user), privateKey, {
          algorithm: "RS256",
        });
        res
          .cookie("jwt", token, {
            expires: new Date(Date.now() + 3600000),
            secure: false,
            httpOnly: true
          })
          .status(201)
          .json(token);
      }
    )(req, res, next);
    
 
};

exports.checkuser = async (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    }
  } catch (error) {
    console.log(error);

    res.status(401).json(error);
  }
};
