import { Server, type Socket as IOSocket } from 'socket.io';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type User = {
  id: number;
  username: string;
  email: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

type SocketData = {
  user: User;
  apiToken: string;
}

export type Socket = IOSocket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  SocketData
>;

export type IO = Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  SocketData
>;
