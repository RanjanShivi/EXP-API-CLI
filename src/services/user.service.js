import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


import * as Utils from '../utils/user.util';
import * as Helpers from '../utils/helper';

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
    throw new Error("User does not exist");
  }else {
    const validPassword = await bcrypt.compare(body.password, searchData.password);
    if (validPassword) {
      const token = Utils.generatrToken(searchData);
      return token;
    }
    else {
      throw new Error("Password Invalid");
    }
  }
};

export const forgetPassword = async (body) => {
  const data = await User.findOne({ email: body.email})
  console.log(data);
  if (data == null) {
    throw new Error("email is not registered")
  }else {
    let token = jwt.sign({"email": data.email, "id": data._id}, process.env.SECRET_KEY2);
    const sendMail = Helpers.sendMailTo(data.email, token);
    return sendMail;
  }
};


