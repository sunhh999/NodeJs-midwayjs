// import { WeatherInfo } from '../interface';
import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { WeatherService } from '../service/weather.service';
import { Context } from '@midwayjs/koa';

// Query 获取 URL 上的参数

@Controller('/')
export class WeatherController {
  @Inject()
  weatherService: WeatherService;

  @Inject()
  ctx: Context; // 通过装饰器注入

  // 装饰器 定义一个路由
  @Get('/weather')
  // @Query('cityId') cityId: string 通过 Query 获取 URL 上的参数
  // cityId: string 通过 Query 获取 URL 上的参数
  async getWeatherInfo(@Query('cityId') cityId: string): Promise<void> {
    // http 的返回 可以直接返回字符串 数字 JSON ，BUffer[二进制] 等
    // return 'Hello Weather!';

    // 返回参数
    // return this.weatherService.getWeather(cityId);
    const resData = await this.weatherService.getWeather(cityId);
    if (resData) {
      // console.log(resData);
      await this.ctx.render('weatherInfo.ejs', resData);
      // await this.ctx.render('weatherInfo.html', resData);
    }
  }
}
