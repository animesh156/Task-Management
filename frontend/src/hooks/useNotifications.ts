import { useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

export const useNotifications = () => {
  const socket = useSocket();

  useEffect(() => {
    socket.on("task:assigned", (payload) => {
      alert(payload.message); // replace with toast later
    });

    return () => {
      socket.off("task:assigned");
    };
  }, []);
};
