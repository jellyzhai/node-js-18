/*
    package.json
        scripts:
            - 自定义命令，并通过 npm 来执行
            - start 和 test 命令，可以直接 npm start , npm test 执行
            - 其他命令 需要通过 npm run xxx 执行
    npm镜像
        - 配置：
            - 彻底修改npm仓库地址（推荐方式）
                - npm set registry https://registry.npmmirror.com
                - 还原到原版仓库
                    npm config delete registry
*/