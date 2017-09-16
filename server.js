const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

console.log("server.js is now running")

hbs.registerPartials(__dirname + '/views/partials')

//Telling express that the view engine is handle bars
app.set('view engine', 'hbs');



app.use((req,res,next)=> {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if (err){
      console.log('Unable to append file')
    }
  });
  //next is critical for the middleware to conclude
  next();
})

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs')
//
// })

//middleware to teach express to read a static link
//app.use registers a middleware
//expess.static takes the absolute directory of your file
//__dirname stores the path to your project directory
app.use(express.static(__dirname+'/public'));




//helper function that does not take in a argument
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()+1;

})

//making helper a function tht takes in a argument
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get(`/`,(req,res)=>{
  //req stores info of the request made
  //res allows us to customize what info we send back
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle:'Home',
    welcomeMessage: "Welcome to my Node/Express/Handlebars app"
  })
});

app.get('/about',(req,res)=> {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  })
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Cannot access page'
  })
});
//Need the app to listen, this binds
//the app to port 3000
//Second argument is a function that runs when file is run
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`)
});
