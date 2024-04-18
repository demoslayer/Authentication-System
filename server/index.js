const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")

const app=express()

const EmployeeModel=require('./models/Employee')

app.use(express.json())

app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Employee");


app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    EmployeeModel.findOne({email:email})
        .then(user => {
            if(user){
                if(user.password===password){
                    res.json("Success")
                }
                else{
                    res.json("Wrong password")
                }
            }
            else{
                res.json("No user found")
            }
    })
})


app.post('/register',(req,res)=>{
EmployeeModel.create(req.body)
.then(employees=>res.json(employees))
.catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log("server is running")
})
