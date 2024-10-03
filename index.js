const express = require("express");
const server = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require('crypto')
const cookieParser = require('cookie-parser');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');
const { isAuth,SanitizedUser, cookieExtractor } = require("./services/common");
const stripe = require("stripe")(process.env.SECRET_KEY)


const privateKey = fs.readFileSync(path.resolve(__dirname, './private.key'), 'utf-8');
const publicKey = fs.readFileSync(path.resolve(__dirname, './public.key'), 'utf-8');








const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = publicKey;
opts.algorithm = ['RS256'];

const productsRouter = require("./routes/Products");
const brandRouter = require("./routes/Brand");
const categoryRouter = require("./routes/Category");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const User = require("./models/User");





dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database connect successfully"))
  .catch((err) => {
    console.log(err);
  });

server.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true // Allow cookies to be sent/received
}));
// server.use(express.static('build'));
server.use(cookieParser());
server.use(express.json());
server.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
server.use(passport.authenticate("session"));

server.use("/products",  productsRouter.router);
server.use("/brands", brandRouter.router);
server.use("/categories",isAuth(), categoryRouter.router);
server.use("/users",isAuth(), userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart",isAuth(), cartRouter.router);
server.use("/orders",isAuth(), orderRouter.router);




passport.use(
  new LocalStrategy(
    {usernameField:'email'},
    async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        done(null, false, { message: "User not Exist" });
      
      }

      crypto.pbkdf2(
        password,
        user.salt,  
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            // done({id:user.id, email:user.email, addresses:user.addresses, name:user.name});
            done(null, false, { message: "Password is incorrect" });
           
          } else {
            // const token = jwt.sign(SanitizedUser(user), privateKey, { algorithm: 'RS256' })
            
            done(null, user);
          }
        }
      );
      
    } catch (err) {
      
      done(err);
    }
  })
);


passport.use('jwt',
  new JwtStrategy(opts,async function(jwt_payload, done) {
  // console.log(jwt_payload)

  try {
    
    
    const user = await User.findOne({_id:jwt_payload.id}) 
    if (user) {
        return done(null, SanitizedUser(user));
    } else {
        return done(null, false);
      
    }
  } catch (err) {
    
    return done(err, false);
  }
    
  ;
}));

passport.serializeUser(function (user, cb) {
  console.log("serialize, user");
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      email: user.email,
      name: user.name,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});


const calculateOrderAmount = (items) => {
  
  return 1000;
};

server.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    // dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
});


// server.get('/', (req, res)=>{
//     res.json({status: 'success'});
// })

// server.post('/products', createProduct)

server.listen(8080, () => {
  console.log("server started successfully");
});
