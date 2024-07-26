import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on('connection', (socket) => {
  console.log('New socket:', socket.id);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Golden Dirt - Socket.io');
});

httpServer.listen(PORT, () => {
  console.log('Golden Dirt - Socket.io server is running at port ' + PORT);
});
