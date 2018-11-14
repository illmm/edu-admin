export default [
  // login
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      //{ path: '/user', redirect: '/user/login' },
      { path: '/login', component: './User/Login' },
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
        component: './Workplace',
       
      },
      //机构管理
      {
        path: '/agency',
        name: 'agency',
        icon: 'cluster',
        component: './Agency/List',
        authority: ['admin'],
        
      },
      {
        path: '/agency/resource',
        name: 'agency.resource',
        component: './Agency/Resource',
        hideInMenu: true,
        authority: ['admin'],
      },
      {
        path: '/agency/info/:id',
        name: 'agency.info',
        component: './Agency/Info',
        hideInMenu: true,
        authority: ['admin'],
      },
      // 课程管理
      {
        path: '/course',
        icon: 'video-camera',
        name: 'course',
        authority: ['admin'],
        routes: [
          {
            path: '/course/video',
            name: 'video',
            component: './Course/Video/List',
          },
          
          {
            path: '/course/online',
            name: 'online',
            component: './Course/Online/List',
          },
          {
            hideInMenu: true,
            path: '/course/online/add',
            name: 'online.add',
            component: './Course/Online/Add',
          },
          
        ],
      },
      // 教材管理
      {
        path: '/material',
        icon: 'book',
        name: 'material',
        authority: ['admin'],
        component: './Material',
      },
      // 教材详细
      {
        path: '/material/info/:id',
        name: 'material.info',
        component: './Material/Info',
        hideInMenu: true,
        authority: ['admin'],
      },
      //培训管理
      {
        name: 'train',
        icon: 'customer-service',
        path: '/train',
        authority: ['admin'],
        component: './Train/List',
      },
      //套餐产品
      {
        name: 'package',
        icon: 'shop',
        path: '/package',
        authority: ['admin'],
        component: './Exception/403',
      },
      //权限管理
      {
        path: '/authority',
        name: 'authority',
        icon: 'profile',
        authority: ['admin'],
        routes: [
          {
            path: '/authority/user',
            name: 'user',
            authority: ['admin'],
            component: './Authority/User',
          },
          // {
          //   path: '/authority/role',
          //   name: 'role',
          //   authority: ['test'],
          //   component: './Exception/403',
          // },
          // {
          //   path: '/authority/menu',
          //   name: 'menu',
          //   authority: ['test'],
          //   component: './Exception/403',
          // },
        ],
      },
      //师生管理
      {
        name: 'member',
        icon: 'user',
        path: '/member',
        authority: ['organize_admin','principal'],
        component: './Exception/403',
      },
      //消息管理
      {
        name: 'message',
        icon: 'message',
        path: '/result',
        authority: ['admin'],
        component: './Exception/403',
       
      },
      //采购管理
      {
        name: 'purchase',
        icon: 'heart',
        path: '/purchase',
        authority: ['organize_admin','principal'],
        component: './Exception/403',
      },
      //统计报表
      {
        name: 'statistics',
        icon: 'bar-chart',
        path: '/statistics',
        authority: ['organize_admin','principal'],
        component: './Exception/403',
      },
    
      //系统设置
      {
        name: 'settings',
        icon: 'setting',
        path: '/settings',
        authority: ['admin'],
        routes: [
          {
            name: 'salesman',
            authority: ['admin'],
            path: '/settings/salesman',
            component: './Settings/Salesman',
          },
          {
            name: 'classify',
            authority: ['admin'],
            path: '/settings/classify',
            component: './Settings/Classify',
          },
        ]
        
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
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
