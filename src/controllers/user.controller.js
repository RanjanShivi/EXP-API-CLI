import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

 export const userRegistration = async (req, res, next) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
    next();
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const data = await UserService.userLogin(req.body);
    if(data === null){
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'User Does not Exit with this email'
      });
    }else{
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Login Successful'
    });
  }
}catch (error) {
  res.status(HttpStatus.BAD_REQUEST).json({
    code: HttpStatus.BAD_REQUEST,
    message: `${error}`  
  });
    next();
   }
};

export const forgetPassword = async (req, res, next) => {
  try {    
      const data = await UserService.forgetPassword(req.body);
      res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Reset Password Link Sent'
    });
  }catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: `${error}`
    })
    next();
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    req.body.userID = req.body.data.id; 
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.RESET_CONTENT).json({
    code: HttpStatus.RESET_CONTENT,
    data: data,
    message: 'Password Reset Successful'
    });
  }catch (error) {
    next(error)
  }
};
