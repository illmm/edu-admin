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
    authority: ['admin','user'],
    routes: [
      // 工作台
      { path: '/', redirect: '/workplace' },
      {
        path: '/workplace',
        name: 'workplace',
        icon: 'desktop',
        component: './Workplace',
       
      },
      //机构管理
      {
        path: '/agency',
        name: 'agency',
        icon: 'cluster',
        component: './Agency/List',
        
      },
      {
        path: '/agency/resource',
        name: 'agency.resource',
        component: './Agency/Resource',
        hideInMenu: true,
      },
      {
        path: '/agency/info',
        name: 'agency.info',
        component: './Agency/Info',
        hideInMenu: true,
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
            authority: ['admin'],
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
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: true,
        routes: [
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
