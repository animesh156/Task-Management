import { createContext, useContext, useEffect } from "react";
import { socket } from "../lib/socket";
import { useMe } from "../hooks/useAuth";

const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useMe();

  useEffect(() => {
    if (!isLoading && user?.id) {
      socket.connect();
      socket.emit("join", user.id);
    }

    return () => {
      socket.disconnect();
    };
  }, [user?.id, isLoading]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
