export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                // 'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
                'feat', // 新功能（feature）
                'fix', // 修补bug
                'docs', // 文档（documentation）
                'style', // 格式，样式（不影响代码运行的改动）；
                'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
                'test', // 增加测试
                'chore', // 构建过程或辅助工具的变动
                'revert', // feat(pencil):  add ‘graphiteWidth’ option (撤销之前的commit)
                'merge', // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
                'perf', // 优化相关（性能，体验）；
                'ci', // 持续集成修改；
                'workflow', // 工作流改进；
                'mod', // 不确定分类的修改；
                'wip', // 开发中；
                'types', // 类型修改；
                'release' // 版本发布；
            ]
        ]
    }
}
