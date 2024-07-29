import { Socket } from '../types';
import BaseHandler from './BaseHandler';

export default class MiscellaneousHandler extends BaseHandler {
  private static instance: MiscellaneousHandler | null = null;

  public static getInstance(socket: Socket) {
    if (this.instance === null) {
      this.instance = new MiscellaneousHandler(socket);
    }
    return this.instance;
  }

  private constructor(socket: Socket) {
    super(socket);
  }

  public onPing() {
    console.log(this.user.username + ' pinged!');
    this.socket.emit('pong');
  }
}
