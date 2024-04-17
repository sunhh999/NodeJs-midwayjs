// 测试用例
import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';

// ? 本测试用例是对 /weather 接口进行测试
// ?: describe 是干嘛的
// ! describe 是一个测试套件，用来组织测试用例、
// ! 一个 describe 里面可以包含多个 it
// ! 一个 it 代表一个测试用例
// 'test/controller/weather.test.ts' 是测试用例的名称
describe('test/controller/weather.test.ts', () => {
  // ? let app: Application; 是干嘛的
  // ! let app: Application; 是定义一个 app 变量，用来存储应用实例
  let app: Application;
  // ? beforeAll 是干嘛的
  // ! beforeAll 是一个钩子函数，会在所有测试用例执行之前执行
  beforeAll(async () => {
    // create app
    // ? createApp 是干嘛的
    // ! createApp 是一个函数，用来创建一个应用实例
    // ? 是用来存储应用实例的吗
    // ! 是的，将应用实例存储在 app 变量中
    app = await createApp<Framework>();
  });

  // ? afterAll 是干嘛的
  // ! afterAll 是一个钩子函数，会在所有测试用例执行之后执行
  afterAll(async () => {
    // close app

    // ? close 是干嘛的
    // ! close 是一个函数，用来关闭应用实例
    await close(app);
  });

  // ? it 是干嘛的
  // ! it 是一个测试用例，代表一个测试用例
  // ? should test /weather with success request 是代表什么
  // ! should test /weather with success request 是测试用例的名称
  it('should test /weather with success request', async () => {
    // make request
    // ? await createHttpRequest(app)
    // ! createHttpRequest 是一个函数，用来创建一个请求实例
    const result = await createHttpRequest(app)
      .get('/weather')
      .query({ cityId: 101010100 });

    // ? expect 是干嘛的
    // ! expect 是一个断言函数，用来判断结果是否符合预期
    // ?  如果不符合预期可以打印出实际内容吗

    expect(result.status).toBe(200);
    expect(result.text).toMatch(/北京/);
  });

  it('should test /weather with fail request', async () => {
    const result = await createHttpRequest(app).get('/weather');

    expect(result.status).toBe(200);
    expect(result.text).toMatch(/weather data is empty/);
  });
});
