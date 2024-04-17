import { Provide, makeHttpRequest } from '@midwayjs/core';
import { WeatherInfo } from '../interface';
import { WeatherEmptyDataError } from '../error/weather.error';

@Provide()
export class WeatherService {
  async getWeather(cityId: string) {
    // 抛出错误异常
    if (!cityId) {
      throw new WeatherEmptyDataError('cityId is Empty');
    }

    try {
      const result = await makeHttpRequest(
        `https://midwayjs.org/resource/${cityId}.json`,
        {
          dataType: 'json',
        }
      );

      if (result.status === 200) {
        console.log(result.data);
        return result.data as WeatherInfo;
      }
    } catch (error) {
      throw new WeatherEmptyDataError(error);
    }
  }
}
