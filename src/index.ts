import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { type RedisClientType, createClient } from 'redis';
import type { IO, Socket } from './types';
import auth from './middleware/auth';
import connectionHandlers from './handlers/connection';
import miscHandlers from './handlers/misc';

dotenv.config();

// let redisClient: RedisClientType;
// const redisClientPromise = createClient({
//   url: process.env.REDIS_URL
// }).connect();

// redisClientPromise.then(client => {
//   redisClient = client;
//   client
//     .on('error', err => console.log('An error occured while connecting to Redis database.', err))
//     .on('connect', () => console.log('Golden Dirt - Connected to Redis database'));
// });

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};
const PORT = process.env.PORT ?? 3000;

const app: Express = express();
const httpServer = createServer(app);
const io: IO = new Server(httpServer, {
  cors: corsOptions,
});

const { onConnection, onDisconnect } = connectionHandlers(io);
const { pongBack } = miscHandlers(io);

io.use(auth);

io.on('connection', (socket: Socket) => {
  // Connection
  onConnection.call(socket);
  socket.on('disconnect', onDisconnect);

  // Misc
  socket.on('misc:ping', pongBack);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Golden Dirt - Socket.io');
});

httpServer.listen(PORT, () => {
  console.log('Golden Dirt - Socket.io server is running at port ' + PORT);
});
