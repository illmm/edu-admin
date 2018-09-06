export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // 工作台
      { path: '/', redirect: '/workplace' },

      {
        path: '/workplace',
        name: 'workplace',
        icon: 'desktop',
        //component: './Dashboard/Workplace',
        component: './Workplace',
       
      },
      //机构管理
      {
        path: '/agency',
        name: 'agency',
        icon: 'cluster',
        routes: [
          {
            path: '/agency/list',
            name: 'list',
            component: './Agency/List',
          },
          {
            path: '/agency/resource',
            name: 'resource',
            component: './Agency/Resource',
          },
          
        ],
      },
      // 课程管理
      {
        path: '/course',
        icon: 'video-camera',
        name: 'course',
        routes: [
          {
            path: '/course/video',
            name: 'video',
            component: './Course/Video',
          },
          {
            path: '/course/online',
            name: 'online',
            component: './Course/Online',
          },
          
        ],
      },
      // 教材管理
      {
        path: '/material',
        icon: 'book',
        name: 'material',
        routes: [
          {
            path: '/material/electron',
            name: 'electron',
            component: './Material/Electron',
          },
          {
            path: '/material/world',
            name: 'world',
            component: './Material/World',
          },
          
        ],

       
      },
      //培训管理
      {
        name: 'train',
        icon: 'customer-service',
        path: '/train',
        component: './Exception/403',
      },
      //套餐产品
      {
        name: 'package',
        icon: 'shop',
        path: '/package',
        component: './Exception/403',
      },
      //权限管理
      {
        path: '/authority',
        name: 'authority',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/authority/user',
            name: 'user',
            component: './Authority/User',
          },
          {
            path: '/authority/role',
            name: 'role',
            component: './Exception/403',
          },
          {
            path: '/authority/menu',
            name: 'menu',
            component: './Exception/403',
          },
        ],
      },
      //师生管理
      {
        name: 'member',
        icon: 'user',
        path: '/member',
        component: './Exception/403',
      },
      //消息管理
      {
        name: 'message',
        icon: 'message',
        path: '/result',
        component: './Exception/403',
       
      },
      //采购管理
      {
        name: 'purchase',
        icon: 'heart',
        path: '/purchase',
        component: './Exception/403',
      },
      //统计报表
      {
        name: 'statistics',
        icon: 'bar-chart',
        path: '/statistics',
        component: './Exception/403',
      },
    
      //系统设置
      {
        name: 'settings',
        icon: 'setting',
        path: '/settings',
        component: './Exception/403',
        
      },
      {
        component: '404',
      },
    ],
  },
];
