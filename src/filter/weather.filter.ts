// 编写
// 收集并过滤触发到错误函数的API 并统一消息返回
import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { WeatherEmptyDataError } from '../error/weather.error';

// 捕获错误
@Catch(WeatherEmptyDataError)
export class WeatherErrorFilter {
  // ctx: Context 通过装饰器注入

  async catch(err: WeatherEmptyDataError, ctx: Context) {
    ctx.logger.error(err);
    return `
    <html>
      <body>
        <h1>weather data is empty</h1>
      </body>
    </html>`;
  }
}
