import { IO, Socket } from '../types';

export default (io: IO) => {
  function pongBack(this: Socket) {
    console.log(this.data.user.username + ' has pinged!');
    this.emit('misc:pong');
  }

  return {
    pongBack,
  };
};