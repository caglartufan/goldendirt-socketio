import { Socket } from '../types';
import BaseHandler from './BaseHandler';

export default class ConnectionHandler extends BaseHandler {
  private static instance: ConnectionHandler | null = null;

  public static getInstance(socket: Socket) {
    if (this.instance === null) {
      this.instance = new ConnectionHandler(socket);
    }
    return this.instance;
  }

  private constructor(socket: Socket) {
    super(socket);
  }

  public onConnection() {
    console.log(this.user.username + ' has connected!');
  }
}
