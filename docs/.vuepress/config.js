module.exports = {
  title: 'Jenay Lee',
  description: "Jenay\'s blog",
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', {el: 'icon',href: '/images/favicon.ico'}], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    nav: [ // 导航栏配置
      { text: 'Notes', link: '/dist/notes/' },
      { text: 'About', link: '/dist/about/'},
      { text: 'Github', link: 'https://github.com/JenayLee'}
    ],
    sidebar: [
      {
        title: '前端',
        collapsable: false, //是否展开
        children:[
          '/dist/notes/frontEnd/webpack',
          '/dist/notes/frontEnd/vue',
          '/dist/notes/frontEnd/react'
        ]
      },
      {
        title: '后端',
        collapsable: false,
        children:['/dist/notes/backEnd/C']
      }
    ],
    // lastUpdated: 'Last Updated'
  },
  configureWepack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'  // 使用别名
      }
    }
  }
};