import { Server } from 'socket.io';

export let io: Server;

// MVC 中用setIO去update websocket server// 房
// 萬一放係 main.ts就用唔到
export function setIO(_io: Server) {
  io = _io;
}
