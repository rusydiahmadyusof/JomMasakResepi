/**
 * Logger utility for consistent logging across the application
 * In production, this can be extended to send logs to a logging service
 */

type LogLevel = "error" | "warn" | "info" | "debug";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private log(level: LogLevel, message: string, context?: LogContext | Error) {
    if (!this.isDevelopment && level === "debug") {
      return; // Skip debug logs in production
    }

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    if (context instanceof Error) {
      const errorContext = {
        message: context.message,
        stack: context.stack,
        name: context.name,
      };
      console[level](logMessage, errorContext);
    } else if (context) {
      console[level](logMessage, context);
    } else {
      console[level](logMessage);
    }

    // In production, you could send to a logging service here
    // if (process.env.NODE_ENV === 'production' && level === 'error') {
    //   sendToLoggingService(level, message, context);
    // }
  }

  error(message: string, error?: Error | LogContext) {
    this.log("error", message, error);
  }

  warn(message: string, context?: LogContext) {
    this.log("warn", message, context);
  }

  info(message: string, context?: LogContext) {
    this.log("info", message, context);
  }

  debug(message: string, context?: LogContext) {
    this.log("debug", message, context);
  }
}

export const logger = new Logger();

