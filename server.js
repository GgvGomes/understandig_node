// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     console.log('Server is running...');
//     response.write('Hello World!');

//     return response.end();
//     // return response.end();
// })

// server.listen(3333)

// ====================================================

import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();
const database = new DatabasePostgres();
// Criar um app no Render - https://render.com/
// https://www.youtube.com/watch?v=hHM-hr9q4mo -> min 1:19


server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration
    });
    // database.create({
    //     title: 'Video 1',
    //     description: 'Description 1',
    //     url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    //     duration: 180
    // });

    // console.log(database.list());

    return reply.status(201).send();
})

server.get('/videos', async (request, reply) => {
    const search = request.query.search;

    const videos = await database.list(search);

    console.log(videos)
    return videos;
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration, url } = request.body

    await database.update(videoId, {
        title,
        description,
        url,
        duration
    });

    return reply.status(204).send();
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;

    await database.delet(videoId);

    return reply.status(204).send();
})

server.listen({
    port: process.env.PORT ?? 3333,
})