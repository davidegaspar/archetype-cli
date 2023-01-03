import winston from 'winston';

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'magenta'
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.printf((info) => {
      if (typeof info.message === 'object') {
        return `${JSON.stringify(info.message, null, 2)}`;
      } else {
        return info.message;
      }
    }),
    winston.format.colorize({ all: true })
  ),
  transports: [new winston.transports.Console()]
});

export { logger };
