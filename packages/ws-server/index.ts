import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 5173 });

const rooms = new Map<string, Set<string>>();

function broadcastToAll(data: any) {
  const msg = JSON.stringify(data);
  wss.clients.forEach((c) => {
    if (c.readyState === 1) c.send(msg);
  });
}

wss.on("connection", (ws) => {
  let currentRoom: string | null = null;
  let currentClient: string | null = null;

     const sendAllCounts = () => {
    rooms.forEach((set, roomId) => {
      ws.send(
        JSON.stringify({
          type: "user_count",
          payload: {
            roomId,
            count: set.size,
          },
        })
      );
    });
  };

  sendAllCounts(); 

  ws.on("message", (raw) => {
    const data = JSON.parse(raw.toString());

    if (data.type === "join") {
      const { roomId, clientId } = data.payload;

      currentRoom = roomId;
      currentClient = clientId;

      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }

      rooms.get(roomId)!.add(clientId);

      broadcastToAll({
        type: "user_count",
        payload: {
          roomId,
          count: rooms.get(roomId)!.size,
        },
      });

      return;
    }

    if (data.type === "chat") {
      broadcastToAll(data);
    }
  });

  ws.on("close", () => {
    if (currentRoom && currentClient && rooms.has(currentRoom)) {
      rooms.get(currentRoom)!.delete(currentClient);

      broadcastToAll({
        type: "user_count",
        payload: {
          roomId: currentRoom,
          count: rooms.get(currentRoom)!.size,
        },
      });
    }
  });
});

console.log("WS running on ws://localhost:5173");
