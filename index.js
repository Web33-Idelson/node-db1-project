const server = require("./api/server.js");

const PORT = process.env.PORT || 5000;

const hubsRouter = require('./data/routers/acountsRouter.js');

server.use('/accounts', hubsRouter)

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
