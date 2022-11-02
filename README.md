## 一、项目介绍

* 1、项目前端采用`vite+react`开发的。前端项目地址
  * [`github`地址](https://github.com/wei090603/vite-react-admin)
  * 如果你不会`react`，你可以参考[前端vite+vue3基础项目模板](https://github.com/wei090603/vue3-admin)来完成
* 2、项目是基于`mysql`数据库，项目中全部采用`typeorm`来操作数据库，弱化了原生`sql`，避免前端的小伙伴没有`sql`基础。
* 3、采用redis缓存登录信息 实现用户单点登录
* 4、实现用户名、手机号码、邮箱任一的方式实现登录。
* 5、使用自定义`token`的方式进行登录鉴权，采用自定义装饰器结合守卫来实现对接口鉴权拦截访问。
* 6、实现单点登录功能，同一时间只能一个地方登录
* 7、如果你要演示菜单权限和接口权限，请自己创建账号、角色、分配菜单和接口权限。
* 8、自定义装饰器实现对接口权限收集，如果这个接口要给角色分配权限的时候就直接加上装饰器，会自动在数据库生成数据
* 9、项目采用monorepo的方式开发 admin A端接口 serve C端接口

## 二、使用项目

* 1、本项目仅仅是实现了`rbac`的权限系统，对于其他的功能需要自己基于这个基础上去扩展

* 2、先在本地创建数据库

* 3、在项目的根目录的`.yml`文件修改为你自己的数据库基本配置(地址、用户名、密码、数据库)

  ```properties
  DB_HOST=localhost
  DB_USERNAME=root
  DB_PASSWORD=123456
  DB_DATABASE=nest_orchid
  ```

* 4、安装依赖包
  ```bash
  # note: npm i yarn -g
  yarn
  ```

* 5、启动项目

  ```bash
  # dev env build
  docker-composer up -d
  # docker ps check redis and mysql start
  docker ps
  # sql import
  docker cp ./nest_orchid.sql mysql:/tmp/init.sql
  docker exec -it mysql /bin/sh
  cd tmp && mysql -u root -pabc123456 nest_orchid < init.sql
  # run dev serve
  yarn start:serve:dev
  ```
* 6、如果你想初始化数据,可以直接导入文件种sql数据

## 三、主要实现功能

- [x] 实现用户的登录、登录鉴权、单点登录、菜单权限、接口权限

- [x] 基于`RBAC`实现权限控制

- [x] 集成`swagger`文档

- [x] 集成`redis`缓存

  ```shell
  nest run build **
  # 开发环境
  nest start -w **
  ```

- [x] 未开发日志管理, 如果要实时查看日志，直接使用`PM2`查看日志

  ```shell
  pm2 log
  ```

## 四、持续集成

* 1、本项目后续考虑采用qiankun 微前端方式抽离 有兴趣朋友可以持续关注

* 2、本项目C端正在持续开发中 敬请期待...



# Monorepo 模式

# orm

\$ 一对多 多对一 一定要存实体否则关系不存在

# 创建一个子服务

\$ nest g app name

# 启动子项代码命令

\$ nest start -w admin

# 创建公用模块

$ nest g lib db
$ nest g lib common

# hat prefix would you like to use for the library (default: @app)? 你要使用什么前缀 @libs

# 一次生成模块

\$ nest g res -p admin 模块名
$ --no-spec 不添加测试文件

# 项目 依赖升级

yarn upgrade-interactive --latest

# 打包

nest build 项目名 admin

# 升级依赖
yarn upgrade nuxt@^2.3.2
