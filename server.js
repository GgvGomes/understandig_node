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
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();
const database = new DatabaseMemory();


server.post('/videos', (request, reply) => {
    const { title, description, duration, url } = request.body

    database.create({
        title,
        description,
        url,
        duration
    });
    // database.create({
    //     title: 'Video 1',
    //     description: 'Description 1',
    //     url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    //     duration: 180
    // });

    console.log(database.list());

    return reply.status(201).send();
})

server.get('/videos', (request, reply) => {
    const search = request.query.search;

    const videos = database.list();

    return videos;
    // return reply.send(videos);
})

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration, url } = request.body

    database.update(videoId, {
        title,
        description,
        url,
        duration
    });

    return reply.status(204).send();
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id;

    database.delet(videoId);

    return reply.status(204).send();
})

server.listen({
    port: 3333,
})