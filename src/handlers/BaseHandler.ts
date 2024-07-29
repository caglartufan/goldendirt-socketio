import { Socket, User } from "../types";

export default class BaseHandler {
  protected socket: Socket;
  protected user: User;
  protected apiToken: string;

  constructor(socket: Socket) {
    this.socket = socket;
    this.user = socket.data.user;
    this.apiToken = socket.data.apiToken;
  };
}