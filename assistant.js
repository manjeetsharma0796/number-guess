const assistGuess = (text) => {
  const [feedback, number] = text.split(" ");
  if (feedback === "Greater") {
    return Math.ceil(number / 2);
  }

  return 50 + Number(number);
};

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

watchStdin(assistGuess);
