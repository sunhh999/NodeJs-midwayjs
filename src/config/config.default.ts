import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1713324162463_4324',
  koa: {
    port: 7001,
  },
  view: {
    mapping: {
      '.ejs': 'ejs',
      '.nj': 'nunjucks',
    },
  },
} as MidwayConfig;
