import winston, { format } from "winston";
const customFormat = format.printf(({ level, message, timestamp }) => {
  const date = new Date();
  return `${date.toDateString()} ${date.toLocaleTimeString()} [${level.toUpperCase()}]: ${message}`;
});
export const logger = winston.createLogger({
  format: customFormat,
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `logger-${new Date().toDateString().replace(/\s/g, "-")}.log`,
    }),
  ],
});