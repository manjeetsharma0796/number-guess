const net = require("node:net");

const server = net.createServer();

const generateRandomNumber = () => Math.ceil((Math.random() * 1000) % 1024);

server.listen(8080, () => {
  console.log("server stated listenting");
});

server.on("connection", (socket) => {
  console.log("connection established", socket.remoteAddress);

  socket.setEncoding("utf-8");
  const randomNumber = generateRandomNumber();
  socket.on("data", (data) => {
    const number = Number(data.trim());
    
    socket.write(`Correct guess ${number}\n`);
  });
});
