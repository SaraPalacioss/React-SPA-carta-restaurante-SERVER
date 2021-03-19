require("dotenv").config();

const bodyParser    = require("body-parser");
const cookieParser  = require("cookie-parser");
const express       = require("express");
const favicon       = require("serve-favicon");
const mongoose      = require("mongoose");
const logger        = require("morgan");
const path          = require("path");
const session       = require("express-session");
const cors          = require("cors");
const flash         = require("connect-flash");
const cookieSession = require('cookie-session')

// MONGOOSE CONECTION
mongoose
  .connect(
    `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.bqpus.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });


const app_name = require("./package.json").name;

const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();


// MDW SETUP
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// EXPRESS VIEW SETUP
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

// CORS SETUP
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// MDW SESSION
// app.use(
//   session({ secret: `${process.env.SECRET}`, resave: true, saveUninitialized: true })
// );

app.set('trust proxy', 1)
app.use(cookieSession({
    name:'session',
    keys: ['key1', 'key2'],
    sameSite: 'none',
    secure: true
}))
app.use(session ({
    secret: `oursecret`,
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        secure: true
    }
}))


app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));


//MDW FLASH
app.use(flash());


//ROUTES
const index = require("./routes/index");
app.use("/", index);

const cartaRoutes = require("./routes/carta.routes");
app.use("/", cartaRoutes);


module.exports = app;
