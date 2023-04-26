require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
require("./passport");
const {readFile, writeFile} = require('fs')
const authRoute = require("./routes/auth");
const app = express();

app.use(
	cookieSession({
		name: "session",
		keys: ["PrinceKumar"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

// app.use("/auth", authRoute);
app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000'
  })
);
app.get('/logout',function(req,res){
	req.logout();
	res.redirect('http://localhost:3000')
})
async function add_user(list){
	writeFile('users.txt', JSON.stringify(list),(err, data) => {
		if(err)
		 console.log(err);
		
	})
}
app.get('/signin',function(req,res){
	readFile("users.txt","UTF-8",async (err,data)=>{
		try{
			console.log(JSON.parse(data))
			let list=JSON.parse(data)
           if((list.findIndex((value)=>value.email==req.query.email)==-1) && (list.findIndex((value)=>value.username==req.query.username)==-1))
		   {
			 list.push(req.query)
			 await add_user(list)
			 res.status(200).json({
				message: "User added successfully",
                data: '1'
			 })
		   }
		   else
			res.status(200).json({
				message: "User already added",
				data: '0'
			})
		}
		catch(err){
			res.status(200).json({
				message: "error adding user",
                data: '0'
			 })
            console.log(err)
        }
	})
})
app.get('/login', (req, res) => {
	readFile("users.txt","UTF-8",async (err,data)=>{
	 try{
		let list=JSON.parse(data)
        let id=list.findIndex(value => value.email==req.query.email);
		
		if(id!=-1 && list[id].password==req.query.password)
		 {
			res.status(200).json({
				message: "successful",
				data: '1',
				username : list[id].username,
				email : list[id].email,
			 })
		 }
		 else
		 {
		    res.status(200).json({
				message: "unsuccessful",
				data: '0',
			 })	
		 }
		}
	   catch(err){
		res.status(200).json({
			message: "error",
			data: '0'
		 })
		console.log(err)
	   }
	})
})
app.get('/check_user',(req, res)=>{
	console.log(req.user)
	if(req.user)
	{
		res.status(200).json({
			message: "successful",
            data: '1',
            email : req.user._json.email,
			username : req.user._json.name,
         })
	}
	else
	{
		res.status(200).json({
			message: "unsuccessful",
            data: '0',
         })
	}
})
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));