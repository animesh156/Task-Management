import { useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { toast } from "react-hot-toast";

export const useNotifications = () => {
  const socket = useSocket();

  useEffect(() => {
    socket.on("task:assigned", (payload) => {
      toast.success(payload.message); // notfiy the user
    });

    return () => {
      socket.off("task:assigned");
    };
  }, []);
};
