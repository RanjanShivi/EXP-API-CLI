import HttpStatus from 'http-status-codes';
import {client} from '../config/redis.js';

export const redis = async (req, res, next)=>{
    const redisData = await client.get('allNotes')
    if(redisData){
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: JSON.parse(redisData),
            message: 'All notes fetched from redis successfully'
  });}
  else{
      next();
  }
}
    /*client.get('allNotes', (err, redis)=>{
        if (err) {
            return err;
        } else if(redis){
            console.log("redis--->", redis);
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: JSON.parse(redis),
                message: 'All notes fetched from redis successfully'
      });
    } else {
        next();
    }
});*/
