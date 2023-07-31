const net = require("node:net");

const client = net.createConnection(8080);

client.on("connect", () => {
  client.setEncoding("utf-8");
  console.log("connected to server");

  let lower = 1;
  let upper = 1024;
  let nextGuessNumber = Math.floor(Math.random() * 100);
  client.write(`${nextGuessNumber}}`);

  client.on("data", (data) => {
    console.log(data);
    
     const { isGreater } = JSON.parse(data);

     if (isGreater) {
       upper = nextGuessNumber;
     } else {
       lower = nextGuessNumber;
     }

      nextGuessNumber = Math.floor(Math.random() * (upper - lower + 1)) + lower;

    setTimeout(() => {
      client.write(`${nextGuessNumber}`);
    }, 1000);
  });
});
