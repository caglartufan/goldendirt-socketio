import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import type { Socket } from './types';
import auth from './middleware/auth';
import MiscellaneousHandler from './handlers/MiscellaneousHandler';
import ConnectionHandler from './handlers/ConnectionHandler';

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};
const PORT = process.env.PORT ?? 3000;

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

io.use(auth);

io.on('connection', (socket: Socket) => {
  const connectionHandler = ConnectionHandler.getInstance(socket);
  const miscellaneousHandler = MiscellaneousHandler.getInstance(socket);

  // Connection
  connectionHandler.onConnection();

  // Misc
  socket.on('ping', () => miscellaneousHandler.onPing);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Golden Dirt - Socket.io');
});

httpServer.listen(PORT, () => {
  console.log('Golden Dirt - Socket.io server is running at port ' + PORT);
});
