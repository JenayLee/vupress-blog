module.exports = {
  title: 'Jenay Lee',
  description: "Jenay\'s blog",
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', {
      rel: 'icon',
      href: '/images/favicon.ico'
    }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav: [ // 导航栏配置
      { text: 'Home', link: '/views/main/' },
      { text: 'About', link: '/views/about/'},
      { text: 'Github', link: 'https://github.com/JenayLee'}
    ],
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  },
  configureWepack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'  // 使用别名
      }
    }
  }
};