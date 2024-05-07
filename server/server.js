require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true,
  dbName: 'test' })
mongoose.connection.once('open', function () {
    console.log('MongoDB running');
  })
  .on('error', function (err) {
    console.log(err);
  });

app.use(express.json());

const userRouter = require('./routes/users')
const tweetRouter = require('./routes/tweet')
const followRouter = require('./routes/follow')
const likesRouter = require('./routes/likes')
const retweetRouter = require('./routes/retweet')

app.use('/api/users', userRouter)
app.use('/api/tweets', tweetRouter)
app.use('/api/follows', followRouter)
app.use('/api/likes', likesRouter)
app.use('/api/retweets', retweetRouter)


// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
