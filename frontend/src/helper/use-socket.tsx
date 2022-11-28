import { useEffect, useMemo, useState } from "react";
import { connect, Socket } from "socket.io-client";

let socket: Socket;

// socket connect之後先 emit
export function useSocket(initFn: (socket: Socket) => () => void) {
  // 無 socket 先 set socket == useMemo
  // console.log("what is socket", socket);
  if (!socket) {
    // console.log(process.env.REACT_APP_PUBLIC_WS_URL);
    socket = connect(process.env.REACT_APP_PUBLIC_WS_URL as string);
  }
  useEffect(() => {
    let teardown: () => void;
    let isDestroyed = false;

    // need to leave socket when window closed
    if (socket.connected) {
      // console.log("socket is already connected", socket.connected);
      teardown = initFn(socket);
    } else {
      // console.log("NO socket", socket.connected);
      socket.on("connect", () => {
        if (!isDestroyed) {
          // console.log("if it run teardown");
          teardown = initFn(socket);
        }
      });
    }

    return () => {
      // check if teardown is destroyed or not
      // console.log("clean up");
      isDestroyed = true;

      // call only if there is teardown
      // might be no if no consistent wifi/ data
      teardown?.();
    };
  }, [initFn]);

  return socket;
}
