import { createClient } from 'redis';

export const client = createClient();

const redisDatabase = async() => {
    try {
        await client.connect();
        console.log("Redis Connected");  
    } catch (error) {
        console.log(error);
    }
}
export default redisDatabase;
