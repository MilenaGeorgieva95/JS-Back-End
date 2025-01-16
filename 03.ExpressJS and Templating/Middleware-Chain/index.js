import middlewareChain from "./middleware-chain.js";

middlewareChain.use((req, res, next) => {
  console.log("First middleware");
  req.user = "John";

  next();
});

middlewareChain.use((req, res, next) => {
  console.log("Second middleware");
  req.age = 20;

  next();
});

middlewareChain.use((req, res, next) => {
  console.log("Third middleware");
  console.log(req);

  next();
});

middlewareChain.execute({}, {});
