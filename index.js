const express = require('express')
const mongoose = require('mongoose');
const User = require("./model.js");
const app = express();
//2025vcetita16 - BrWbgI4qcU0eovP7
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/api', (req, res) => {
  res.send('Welcome');
});


app.post("/register", async (req, res) => {
try {
    const phone = req.body.phone;
    const existingUser = await User.findOne({ phone });
    
    if (existingUser) {
        return res.status(400).json({
            status:false,
            message: "Phone number already registered",
        });
    }
    
    const newUser = await User.create(req.body);
    
    res.status(200).json({
        status:true,
        message:"successful",
        userId: newUser._id,
        name: newUser.name,
        phone: newUser.phone,
    });

  } catch (error) {
            res.status(500).json({
                status:false,
                message: error.message,
            });
        }
    });

    app.post("/login", async (req, res) => {
        try {
          const phone = req.body.phone;
          const password = req.body.password;
      
          const user = await User.findOne({ phone });
      
          if (!user) {
            return res.status(404).json({
              status: false,
              message: "User not found!",
            });
          }
      
          if (password !== user.password) {
            return res.status(400).json({
              status: false,
              message: "Wrong password",
            });
          }
      
          res.status(200).json({
            status: true,
            message: "Login Successfull",
            userId: user._id,
            name: user.name,
            phone: user.phone,
          });
        } catch (error) {
          res.status(500).json({
            status: false,
            message: error.message,
          });
        }
      });      

mongoose.connect("mongodb+srv://2025vcetita16:BrWbgI4qcU0eovP7@demo.sfh3b0c.mongodb.net/?retryWrites=true&w=majority&appName=Demo").then(() =>{
    console.log("connected to db")
    app.listen(3000, () =>{
        console.log("Listing port 3000");
    });
}).catch(()=>{
    console.log("connect failed");
})
