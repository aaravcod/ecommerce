import { createClient } from 'redis';

const publisher = createClient();
const subscriber = createClient();

await publisher.connect();
await subscriber.connect();

publisher.on('error', (err) => console.error('Redis Publisher Error', err));
subscriber.on('error', (err) => console.error('Redis Subscriber Error', err));

export { publisher, subscriber };
