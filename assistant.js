const watchStdin = (onData) => {
  process.stdin.setEncoding("utf-8");

  process.stdin.on("data", (keyPressed) => {
    if (keyPressed.trim() === "q") {
      process.stdin.pause();
      return;
    }
    process.stdout.write(`${onData(keyPressed)}\n`);
  });
};

const assistGuess = () => {
  let lower = 1;
  let upper = 1024;
  let nextNumber = Math.floor(Math.random() * 100);
  process.stdout.write(`${nextNumber}`);

  const cb = (result) => {
    try {
      JSON.parse(result);
    } catch (e) {
      console.log("invalid result");
      return;
    }

    const { isGreater } = JSON.parse(result);

    if (isGreater) {
      upper = nextNumber;
    } else {
      lower = nextNumber;
    }
    nextNumber = Math.floor(Math.random() * (upper - lower + 1)) + lower;

    return nextNumber;
  };

  watchStdin(cb);
};

assistGuess();
