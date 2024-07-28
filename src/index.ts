import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import { parse } from 'cookie';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import type { Socket, User } from './types';

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  },
});

io.use((socket: Socket, next) => {
  const unauthorizedError = new Error('Unauthorized!');

  if(!socket.request.headers.cookie) {
    return next(unauthorizedError);
  }

  const cookie = parse(socket.request.headers.cookie);
  const apiToken = cookie.api_token.slice(4);

  if(!apiToken) {
    return next(unauthorizedError);
  }

  fetch('http://localhost/api/user', {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + apiToken
    }
  })
    .then(response => {
      if(response.status !== 200) {
        throw unauthorizedError;
      }
      return response.json();
    })
    .then((data: User) => {
      socket.data.user = data;
      next();
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
})

io.on('connection', (socket: Socket) => {
  const user = socket.data.user;

  console.log('New user:', user.username);

  socket.on('ping', () => {
    console.log(socket.id + ' pinged!');
    socket.emit('pong', user.username);
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Golden Dirt - Socket.io');
});

httpServer.listen(PORT, () => {
  console.log('Golden Dirt - Socket.io server is running at port ' + PORT);
});
