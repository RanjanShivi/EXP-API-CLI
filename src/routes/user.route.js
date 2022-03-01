import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
//router.get('', userController.getAllUsers);

//route to create a new user
router.post('/userregister', newUserValidator, userController.userRegistration);

//route to login registered users
router.get('/login', userController.userLogin);


export default router;
