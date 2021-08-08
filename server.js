const express = require('express'); 
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: "kert",
  cookie: {
    httpOnly: true,
    secure: false
  }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Routes
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/post', require('./routes/postRouter'));

// Port setting
app.listen(port, () => {
  console.log('server on! http://localhost:' + port);
});