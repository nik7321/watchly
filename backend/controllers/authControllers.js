import {User} from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export async function signup(req,res){
    try{
        const {email,password,username} = req.body;
        if(!email || !password || !username){
            return res.status(400).json({success:false,message:"Input field missing"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //pattern for email

        if (!emailRegex.test(email)) {
			return res.status(400).json({ success: false, message: "Invalid email" });
		}

		if (password.length < 7) {
			return res.status(400).json({ success: false, message: "Password must be atleast 7 characters" });
		}

        //Existing email check
        const existingUserByEmail = await User.findOne({email:email});

        if(existingUserByEmail){
            return res.status(400).json({success:false,message:"Email exists already"});
        }

        //Existing Username check
        const existingUserByUsername = await User.findOne({username:username });

		if (existingUserByUsername) {
			return res.status(400).json({ success: false, message: "Username exists already" });
		}
      
        //password hashing
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        //random profile image selection from FEnd
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]; 

        //creating new user profile after checking all base conditions
        const newUser = new User({
            email:email,
            password:hashedPassword,
            username:username,
            image:image
        });

        
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();

        //removing password from res and returning response
        res.status(201).json({success:true,user:{ 
            ...newUser._doc,
            password:""
        }});
        

    }
    catch(error){
        console.log("Error signing up", error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export async function login(req,res) {
    try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ success: false, message: "Input fields missing" });
		}

		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(404).json({ success: false, message: "Invalid credentials" }); 
		}

		const isPasswordCorrect = await bcryptjs.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

        //if all ok, generate token and set cookie for logged in user
		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: "",
			},
		});
	} 
    
    catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function logout(req,res) {
    try{
        res.clearCookie("jwt-watchly");
        res.status(200).json({success:true,message:"Logged out successfully"});
    }
    catch(error){
        console.log("Error in Logout controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export async function authCheck(req, res) {
	try {
		// console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}