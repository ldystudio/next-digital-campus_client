# Next数字校园——前端

Next数字校园系统是一套基于现代化信息技术的全新型校园管理系统

## 特色

-   模块化设计：采用模块化设计，根据不同功能需求实现自定义开发和集成，保证了系统的高可扩展性和灵活性。
-   安全可靠：采用多重安全认证、加密传输等措施，确保数据安全和系统稳定。
-   互动便捷：支持移动设备访问，能够随时随地进行信息交流和共享，提升用户使用体验。
-   数据分析：集成了多种数据分析和挖掘工具，通过数据分析和挖掘，提供更全面的学校管理信息支持。
-   教育教学：采用针对性设计，兼顾教育教学特色，提供更符合教师和学生需求的管理和学习功能。
-   在线沟通：提供实时的在线聊天和讨论功能，可通过系统内部的消息系统进行交流和协作，方便快捷地解决问题和分享信息。

## 使用前沿技术

-   [React 18](https://react.dev/)
-   [Redux](https://www.redux.org.cn/)
-   [Next.js 14](https://nextjs.org/docs/getting-started)
-   [NextUI](https://nextui.org)
-   [Framer Motion](https://www.framer.com/motion)
-   [Tailwind CSS](https://tailwindcss.com)
-   [TypeScript](https://www.typescriptlang.org)

## 如何使用

1. 拉取项目到本地

    ```bash
    git clone https://github.com/ldystudio/next-digital-campus_client.git
    ```

2. 切换目录

    ```bash
    cd next-digital-campus_client
    ```

3. 安装所需依赖

    ```bash
    npm i -g pnpm@latest

    pnpm i
    ```

4. 将后端生成的public.pem放到本项目根目录

5. 运行项目

    ```bash
    pnpm run dev
    ```

浏览器打开：http://localhost:3000/

## 部署

检查``.env.production``和``next.config.js``的env变量，输入``docker-compose up -d``一键部署！

## License

Licensed under the [MPL-2.0 license](https://github.com/ldystudio/next-digital-campus_client/blob/master/LICENSE).
