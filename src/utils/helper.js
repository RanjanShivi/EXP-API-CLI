import nodemailer from "nodemailer";
import logger, {logStream} from '../config/logger'


export const sendMailTo = (recieverID, token) => {
    
    const transport = nodemailer.createTransport({
        service : "gmail",
        auth: {
            user : process.env.SENDER_ID,
            pass : process.env.PASSWORD
        }

    })

    const mailInfo = {
        from : process.env.SENDER_ID,
        to: recieverID,
        subject : "Password Reset Link",
        html : `<h1>Hii,<br>Click on this link</br></h1><h1>href=http://localhost:5000/${token}</h1>`

    }
    return new Promise((resolve,reject)=>{
        transport.sendMail(mailInfo,(err,info)=> {
            if(err){
                logger.log('error', err);
                //throw new Error("Something went wrong while sending reset password link....")
                return reject('Something went wrong while sending reset password link....');
            }
            else{
                logger.log('info', info);
                return resolve('Reset password link send successfully');
            }
        })

    });
    
}