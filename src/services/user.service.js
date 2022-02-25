import User from '../models/user.model';
import bcrypt from "bcrypt"

import * as Utils from '../utils/user.util';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const userRegistration = async (body) => {
  //console.log("request:", req);
  const user = await User.findOne({ email: body.email })
  if (user == null) {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    const data = await User.create(body);
    return data;
  }else {
    throw new Error ("User Already Exists") ;
  }
  };

  // login user
export const userLogin = async (body) => {
  const searchData = await User.findOne({ email: body.email})
  if (searchData == null) {
    throw new Error("User does not exist")
  }else {
    const validPassword = await bcrypt.compare(body.password, searchData.password);
  if (validPassword) {
    const token = Utils.generatrToken(searchData);
    return token;
    //var jwt = require('jsonwebtoken');
    //let token = jwt.sign({"email": searchData.email, "id": searchData._id}, process.env.SECRET_KEY);
    //return token;
  }else {
throw new Error("Password Invalid");
  }
  }
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
