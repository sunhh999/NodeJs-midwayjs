import {
  Mock,
  ISimulation,
  App,
  Inject,
  IMidwayApplication,
  MidwayMockService,
} from '@midwayjs/core';
import { WeatherService } from '../service/weather.service';

// WeatherDataMock 类用于模拟天气数据，其中的 setup 方法，用于实际的初始化模拟，其中，我们使用了内置的 MidwayMockService 的 mockClassProperty 方法，将 WeatherService 的 getWeather 方法模拟掉。
// 在模拟过程中，我们仅仅将单个城市的数据进行了处理，其他依旧走了原来的接口。
// enableCondition 用于标识这个模拟类在哪些场景下生效，比如我们上面的代码就仅在本地和测试环境生效。
// 这样，当本地开发和测试时，我们请求 101010100 的数据，将直接被拦截和返回，且在部署到服务器环境后，也不会受到影响。

@Mock()
export class WeatherDataMock implements ISimulation {
  @App()
  app: IMidwayApplication;

  @Inject()
  mockService: MidwayMockService;

  async setup(): Promise<void> {
    const originMethod = WeatherService.prototype.getWeather;
    this.mockService.mockClassProperty(
      WeatherService,
      'getWeather',
      async cityId => {
        if (cityId === '101010100') {
          return {
            city: '北京',
            cityid: '101010100',
            temp: '27.9999',
            WD: '南风',
            WS: '小于3级',
            SD: '28%',
            AP: '1002hPa',
            njd: '暂无实况',
            WSE: '<3',
            time: '17:55',
            sm: '2.1',
            isRadar: '1',
            Radar: 'JC_RADAR_AZ9010_JB',
          };
        } else {
          return originMethod.apply(this, [cityId]);
        }
      }
    );
  }

  enableCondition(): boolean | Promise<boolean> {
    // 模拟类启用的条件
    return ['local', 'test', 'unittest'].includes(this.app.getEnv());
  }
}
