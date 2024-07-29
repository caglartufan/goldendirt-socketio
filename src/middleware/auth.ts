import { parse } from 'cookie';
import { ExtendedError } from 'socket.io/dist/namespace';
import axios from '../lib/axios';
import { ErrorHandler, UnauthorizedError } from '../utils/error-handler';
import { Socket } from '../types';

const auth = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  const unauthorizedError = new UnauthorizedError();

  if (!socket.request.headers.cookie) {
    return next(unauthorizedError);
  }

  const cookie = parse(socket.request.headers.cookie);
  const apiToken = cookie.api_token?.slice(4);
  console.log(apiToken);

  if (!apiToken) {
    return next(unauthorizedError);
  }

  axios
    .get('/api/user', {
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
    .then((res) => {
      if (res.status !== 200) {
        throw unauthorizedError;
      }

      socket.data.user = res.data;
      socket.data.apiToken = apiToken;
      next();
    })
    .catch((err) => {
      console.log('Error occured while requesting user data!', err);
      const handledErr = ErrorHandler.handle(err);
      next(handledErr);
    });
};

export default auth;
