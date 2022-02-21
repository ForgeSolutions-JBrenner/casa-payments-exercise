import User from "../models/user";
import { hashPass, comparePassword } from "./helpers/auth";
import jwt from "jsonwebtoken";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const register = async (req, res) => {
  try {
    //add some user validation for funzies
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!password) {
      return res.json({
        error: "Password is too short should be 6 chars",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }

    //hash the plain password prior to saving to db
    const hashedPass = await hashPass(password);

    //create stripe customer upon registration for stripe customer id 
    const customer = await stripe.customers.create({
      name,
      email,
    })
    console.log("stripe customer created on signup ")
    try {
      const user = await new User({
        name,
        email,
        password: hashedPass,
        stripe_customer_id: customer.id
      }).save();

      //create token to auto login post registration 
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      //   console.log(user);
      const { password, ...rest } = user._doc;
      return res.json({
        token,
        user: rest,
      });
    } catch (error) {
      console.log("there was an error creating the user", error);
    }
    res.json({
      data: "everything looks good",
    });
  } catch (error) {
    console.log("error received", error);
  }
};

export const login = async (req, res) => {
  try {
    //find the user if exists in mongodb
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        error: "No user found with that email address",
      });
    }

    //check for the password in mongodb to compare entry to hashed version in mongodb
    const match = await comparePassword(req.body.password, user.password);
    if (!match) {
      return res.json({
        error: "You have entered the incorrect password, please try again.",
      });
    }
    //create a signed token for auto login
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //ship the token off to the client side
    const { password, ...rest } = user._doc;
    res.json({
      token,
      user: rest,
    });
  } catch (error) {
    console.log("You have an error, ", error);
  }
};
