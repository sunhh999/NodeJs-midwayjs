import { MidwayError } from '@midwayjs/core';

export class WeatherEmptyDataError extends MidwayError {
  constructor(messageOrErr?: string | Error, err?: Error) {
    let message = 'weather data is Empty';
    if (typeof messageOrErr === 'string') {
      message = messageOrErr;
    }
    super(message, {
      cause: typeof messageOrErr === 'string' ? err : messageOrErr,
    });
    if (err?.stack) {
      this.stack = err.stack;
    }
    if (err?.name) {
      this.name = err.name;
    }
  }
}
