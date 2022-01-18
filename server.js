require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');
const path = require('path');



// import routes
const authRouter = require('./routes/auth');
const recipesRouter = require('./routes/recipes');


// app
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json({limit: '50mb', extended: true}));    
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

// routes
app.use('/api/auth', authRouter);
app.use('/api/recipes', recipesRouter);


app.get('*', async (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// connect to db and start server
const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB(process.env.DATABASE);
    app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    })
  } catch (error) {
    console.log(error);
  }
}
start();