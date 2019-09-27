const express=require('express');
const app=express();
const mongoose=require('mongoose');

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


mongoose.connect("mongodb+srv://SOCKETIO:SOCKETIO@cluster0-pyadw.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('connected to db ' );
});

mongoose.connection.on('error', err => {
  console.log('error: ' + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const User=require('./UserController');
app.use('/user',User);



app.use(express.static('Public'))
app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, './Public/signup.html'));
  });
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, './Public/signup.html'));
});
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, './Public/chat.html'));
});
app.listen(4000,()=>{
    console.log("server started ")
})


