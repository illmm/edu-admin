// https://umijs.org/config/
import os from 'os';
import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      targets: {
        ie: 11,
      },
      locale: {
        enable: true, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
      },
      pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          importWorkboxFrom: 'local',
        },
      },
      ...(!process.env.TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime'],
            },
            hardSource: true,
          }
        : {}),
    },
  ],
];

// judge add ga
if (process.env.APP_TYPE === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-126457224-1',
    },
  ]);
}

export default {
  // add for transfer to umi
  plugins,
  targets: {
    ie: 11,
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 路由配置
  routes: pageRoutes,

  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  proxy: {
    '/api': {
      target: 'http://192.168.1.157:8998',
    },
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },

  chainWebpack: webpackPlugin,
};
