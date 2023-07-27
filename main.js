const { GuessController } = require("./guess-controller");
const { GuessGame } = require("./guess-game");
const net = require("node:net");
const generateRandomNumber = () => Math.ceil((Math.random() * 1000) % 1024);

const gameServer = (randomNumber, chances, server) => {
  server.listen(8080, () => {
    console.log("server stated listenting");
  });

  server.on("connection", (socket) => {
    console.log("New Player joined");
    socket.setEncoding("utf-8");
    const guessGame = new GuessGame(randomNumber, chances);
    const guessController = new GuessController(guessGame);

    socket.on("data", (data) => {
      const number = Number(data.trim());
      const message = guessController.guessAndFeedBack(number);
      socket.write(`${message}\n`);
      if (guessController.isGameOver()) {
        socket.end();
      }
    });
  });
};

const main = () => {
  const randomNumber = generateRandomNumber();
  console.log(randomNumber);
  const chances = 5;
  const server = net.createServer();

  gameServer(randomNumber, chances, server);
};

main();
