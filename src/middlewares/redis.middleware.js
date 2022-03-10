import HttpStatus from 'http-status-codes';
import {client} from '../config/redis.js';


export const getRedisNotes = async (req, res, next)=>{
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
   