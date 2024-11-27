const express = require('express');  
const mongoose = require('mongoose');  
const clubRoutes = require('./routes/clubRoutes');  
const userRoutes = require('./routes/userRoutes');  
const bcrypt = require('bcrypt');  


const app = express();  

// Middleware 
const bodyParser = require('body-parser'); 
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));  

// Routes  
app.use('/api/club', clubRoutes);  
app.use('/api/user', userRoutes);  

app.get("/", (req, res) => {  
    res.send("Welcome to the Club API!");  
});  

// Connect to MongoDB and then start the server  
mongoose.connect("mongodb+srv://confistic:ISTuFx4WpeNUpHRK@clubber.vuh0d.mongodb.net/?retryWrites=true&w=majority&appName=clubber")  
  .then(() => {  
    console.log("Connection successful");  
    // Start the server only after a successful database connection  
    app.listen(3000, () => {  
        console.log("Server is running on port 3000");  
    });  
  })  
  .catch((error) => {  
    console.log("Database connection error:", error);  
  });