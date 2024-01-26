const app = require("./app");
const logger = require("./configs/logger.config");

// .env variables
const PORT = process.env.PORT || 8000;

// console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  logger.info(`Server is running at: http://localhost:${PORT}`);
});
