# 管理员前端

#### 项目介绍
基于 ES2015+、React、UmiJS、dva、g2 和 antd

#### 结构介绍
```
├── assets
│   ├── logo.jpg
│   └── logo.svg
├── components
│   ├── ActiveChart
│   │   ├── index.js
│   │   └── index.less
│   ├── Authorized
│   │   ├── Authorized.js
│   │   ├── AuthorizedRoute.js
│   │   ├── CheckPermissions.js
│   │   ├── CheckPermissions.test.js
│   │   ├── PromiseRender.js
│   │   ├── Secured.js
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.md
│   │   └── renderAuthorize.js
│   ├── AvatarList
│   │   ├── AvatarItem.d.ts
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.en-US.md
│   │   ├── index.js
│   │   ├── index.less
│   │   └── index.zh-CN.md
│   ├── Charts
│   │   ├── Bar
│   │   ├── ChartCard
│   │   ├── Field
│   │   ├── Gauge
│   │   ├── MiniArea
│   │   ├── MiniBar
│   │   ├── MiniProgress
│   │   ├── Pie
│   │   ├── Radar
│   │   ├── TagCloud
│   │   ├── TimelineChart
│   │   ├── WaterWave
│   │   ├── autoHeight.js
│   │   ├── bizcharts.d.ts
│   │   ├── bizcharts.js
│   │   ├── demo
│   │   ├── g2.js
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.less
│   │   └── index.md
│   ├── CountDown
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.en-US.md
│   │   ├── index.js
│   │   └── index.zh-CN.md
│   ├── DescriptionList
│   │   ├── Description.d.ts
│   │   ├── Description.js
│   │   ├── DescriptionList.js
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.en-US.md
│   │   ├── index.js
│   │   ├── index.less
│   │   ├── index.zh-CN.md
│   │   └── responsive.js
│   ├── EditableItem
│   │   ├── index.js
│   │   └── index.less
│   ├── EditableLinkGroup
│   │   ├── index.js
│   │   └── index.less
│   ├── Ellipsis
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.en-US.md
│   │   ├── index.js
│   │   ├── index.less
│   │   ├── index.test.js
│   │   └── index.zh-CN.md
│   ├── Exception
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.en-US.md
│   │   ├── index.js
│   │   ├── index.less
│   │   ├── index.zh-CN.md
│   │   └── typeConfig.js
│   ├── FooterToolbar
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.en-US.md
│   │   ├── index.js
│   │   ├── index.less
│   │   └── index.zh-CN.md
│   ├── GlobalFooter
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.less
│   │   └── index.md
│   ├── GlobalHeader
│   │   ├── RightContent.js
│   │   ├── index.js
│   │   └── index.less
│   ├── HeaderSearch
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.less
│   │   └── index.md
│   ├── Login
│   │   ├── LoginItem.js
│   │   ├── LoginSubmit.js
│   │   ├── LoginTab.js
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.en-US.md
│   │   ├── index.js
│   │   ├── index.less
│   │   ├── index.zh-CN.md
│   │   ├── loginContext.js
│   │   └── map.js
│   ├── NoticeIcon
│   │   ├── NoticeIconTab.d.ts
│   │   ├── NoticeList.js
│   │   ├── NoticeList.less
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.en-US.md
│   │   ├── index.js
│   │   ├── index.less
│   │   └── index.zh-CN.md
│   ├── NumberInfo
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.en-US.md
│   │   ├── index.js
│   │   ├── index.less
│   │   └── index.zh-CN.md
│   ├── PageHeader
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.less
│   │   ├── index.md
│   │   └── index.test.js
│   ├── PageHeaderWrapper
│   │   ├── GridContent.js
│   │   ├── GridContent.less
│   │   ├── index.js
│   │   └── index.less
│   ├── PageLoading
│   │   └── index.js
│   ├── Result
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.less
│   │   └── index.md
│   ├── SettingDrawer
│   │   ├── BlockChecbox.js
│   │   ├── ThemeColor.js
│   │   ├── ThemeColor.less
│   │   ├── index.js
│   │   └── index.less
│   ├── SiderMenu
│   │   ├── BaseMenu.js
│   │   ├── SliderMenu.js
│   │   ├── SliderMenu.test.js
│   │   ├── index.js
│   │   └── index.less
│   ├── StandardFormRow
│   │   ├── index.js
│   │   └── index.less
│   ├── StandardTable
│   │   ├── index.js
│   │   └── index.less
│   ├── TagSelect
│   │   ├── TagSelectOption.d.ts
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.less
│   │   └── index.md
│   ├── TopNavHeader
│   │   ├── index.js
│   │   └── index.less
│   ├── Trend
│   │   ├── demo
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.less
│   │   └── index.md
│   └── _utils
│       ├── pathTools.js
│       └── pathTools.test.js
├── defaultSettings.js
├── e2e
│   ├── home.e2e.js
│   └── login.e2e.js
├── global.less
├── layouts
│   ├── BasicLayout.js
│   ├── BlankLayout.js
│   ├── Footer.js
│   ├── Header.js
│   ├── Header.less
│   ├── MenuContext.js
│   ├── UserLayout.js
│   └── UserLayout.less
├── locales
│   ├── en-US.js
│   └── zh-CN.js
├── models
│   ├── global.js
│   ├── login.js
│   └── setting.js
├── pages
│   ├── 404.js
│   ├── Account
│   │   ├── Center
│   │   └── Settings
│   ├── Agency
│   │   ├── List.js
│   │   └── Resource.js
│   ├── Authority
│   │   ├── Menu.js
│   │   ├── Role.js
│   │   ├── User.js
│   │   ├── User.less
│   │   └── models
│   ├── Authorized.js
│   ├── Course
│   │   ├── Online.js
│   │   └── Video.js
│   ├── Exception
│   │   ├── 403.js
│   │   ├── 404.js
│   │   ├── 500.js
│   │   ├── TriggerException.js
│   │   ├── models
│   │   └── style.less
│   ├── Material
│   │   ├── Electron.js
│   │   └── World.js
│   ├── User
│   │   ├── Login.js
│   │   └── Login.less
│   ├── Workplace
│   │   ├── index.js
│   │   └── index.less
│   └── document.ejs
├── services
│   ├── api.js
│   ├── error.js
│   └── user.js
└── utils
    ├── Authorized.js
    ├── Yuan.js
    ├── authority.js
    ├── authority.test.js
    ├── request.js
    ├── utils.js
    └── utils.less
```


