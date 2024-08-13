import Fastify from 'fastify';
import { basicAuthHandler } from './route-handlers/basic-auth';

const fastify = Fastify({
    logger: true
});

fastify.get('/health', async (request, reply) => {
    reply.send('all good');
});

fastify.get('/basic-auth', basicAuthHandler);

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}