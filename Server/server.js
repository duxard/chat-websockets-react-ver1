const WebSocketServer = require('ws').Server;
const port = 9090;
const wss = new WebSocketServer({ port });

let clients = [];

wss.on('listening', () => {
  console.info(`The server is ready at localhost:${port}`);

  wss.on('connection', (connection) => {
    clients.push(connection);
    broadcast({username: "admin", message: "a user has entered the room"});

    connection.on('message', (message) => {
      const data = JSON.parse(message);
      broadcast(data);
    });
  });

  setInterval(cleanUp, 100);
});

function broadcast(message) {
  clients.forEach(client => client.send( JSON.stringify(message) ));
}

function cleanUp() {
  const clientsLEaving = clients.filter(client => client.readyState === client.CLOSED);
  clients = clients.filter(client => client.readyState !== client.CLOSED);
  clientsLEaving.forEach(client => broadcast({username: "admin", message: "a user has left the room"}));
}
