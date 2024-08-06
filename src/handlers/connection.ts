import { IO, Socket } from '../types';

export default (io: IO) => {
  function onConnection(this: Socket) {
    const socket = this;
    console.log(socket.data.user.username + ' has connected!');
  };

  function onDisconnect(this: Socket) {
    const socket = this;
    console.log(this.data.user.username + ' has disconnected!');
  }

  return {
    onConnection,
    onDisconnect
  };
};
