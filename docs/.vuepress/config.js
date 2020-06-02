module.exports = {
    title: 'Jenay Lee',
    description: "Jenay\'s blog",
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', {
            rel: 'shortcut icon',
            type: "image/x-icon",
            href: "/images/logo.ico"
        }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/JenayLee/', // 这是部署到github相关的配置
    markdown: {
        // markdown-it-anchor 的选项
        anchor: { permalink: false },
        // markdown-it-toc 的选项
        toc: { includeLevel: [1, 2] },
        config: md => {
            // 使用更多的 markdown-it 插件!
            md.use(require('markdown-it'))
        }
    },
    themeConfig: {
        nav: [ // 导航栏配置
            { text: 'Notes', link: '/dist/notes/frontEnd/checking' },
            { text: 'About', link: '/dist/about/' },
            { text: 'Github', link: 'https://github.com/JenayLee' }
        ],
        sidebar: [{
                title: '前端',
                collapsable: false, //是否展开
                children: [
                    '/dist/notes/frontEnd/checking',
                    '/dist/notes/frontEnd/webpack',
                    '/dist/notes/frontEnd/axios',
                    '/dist/notes/frontEnd/vue',
                    '/dist/notes/frontEnd/react',
                    '/dist/notes/frontEnd/angular',
                    '/dist/notes/frontEnd/flutter',
                    '/dist/notes/frontEnd/optimize',
                    '/dist/notes/frontEnd/async',
                    '/dist/notes/frontEnd/tcp',
                ]
            },
            {
                title: '后端',
                collapsable: false,
                children: ['/dist/notes/backEnd/C']
            }
        ],
        // lastUpdated: 'Last Updated'
    },
    configureWepack: {
        resolve: {
            alias: {
                '@alias': 'path/to/some/dir' // 使用别名
            }
        }
    }
};