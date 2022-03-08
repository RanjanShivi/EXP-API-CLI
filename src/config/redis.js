import { createClient } from 'redis';

export const client = createClient();

const redisDatabase = async() => {
    try {
        await client.connect();
        console.log("redis connected");  
    } catch (error) {
        console.log(error);
    }
}
export default redisDatabase;
