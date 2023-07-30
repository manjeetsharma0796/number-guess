const { GuessController } = require("./guess-controller");
const { GuessGame } = require("./guess-game");
const net = require("node:net");
const generateRandomNumber = () => Math.ceil((Math.random() * 1000) % 1024);

const gameServer = (chances, server) => {
  server.listen(8080, () => {
    console.log("server stated listenting");
  });

  server.on("connection", (socket) => {
    console.log("New Player joined");
    socket.setEncoding("utf-8");

    const randomNumber = generateRandomNumber();
    console.log(randomNumber);
    const guessGame = new GuessGame(randomNumber, chances);
    const guessController = new GuessController(guessGame);

    socket.on("data", (data) => {
      const number = Number(data.trim());
      console.log(number);
      const message = guessController.guessAndFeedBack(number);
      socket.write(JSON.stringify(message) + '\n');

      if (guessController.isGameOver()) {
        socket.end();
      }
    });
  });
};

const main = () => {
  const chances = 25;
  const server = net.createServer();

  gameServer(chances, server);
};

main();
