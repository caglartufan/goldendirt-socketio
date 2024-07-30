import { IO, Socket } from '../types';

export default (io: IO) => {
  function onConnection(this: Socket) {
    console.log(this.data.user.username + ' has connected!');
  };

  return {
    onConnection,
  };
};
