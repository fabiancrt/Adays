const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws, req) => {
  const username = new URL(req.url, `http://${req.headers.host}`).searchParams.get('username');
  console.log(`User connected: ${username}`);

  ws.on('message', (message) => {
    console.log(`Received message from ${username}: ${message}`);
  });

  ws.on('close', () => {
    console.log(`User disconnected: ${username}`);
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error for user ${username}:`, error);
  });

  setInterval(() => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'TASK_UPDATE' }));
      }
    });
  }, 5000);
});

console.log('WebSocket server is running on ws://localhost:3001');