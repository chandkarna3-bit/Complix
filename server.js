require('dotenv').config();

const createApp = require('./src/app');
const connectDB = require('./src/config/db');
const logger = require('./src/utils/logger');
const { shutdownOCR } = require('./src/services/ocrService');

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();

  const app = createApp();
  const server = app.listen(PORT, () => {
    logger.info(`Complix backend listening on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });

  const shutdown = async (signal) => {
    logger.info(`${signal} received — shutting down gracefully`);
    server.close(async () => {
      await shutdownOCR();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start().catch((err) => {
  logger.error(`Fatal startup error: ${err.message}`);
  process.exit(1);
});
