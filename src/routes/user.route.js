import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/validator';
import { userAuthForPassword } from '../middlewares/auth.middleware';


const router = express.Router();

//route to create a new user
router.post('/userregister', newUserValidator, userController.userRegistration);

//route to login registered users
router.get('/login', userController.userLogin);

router.get('/forgetpassword', userController.forgetPassword);

router.put('/resetpassword', userAuthForPassword, userController.resetPassword);

export default router;
