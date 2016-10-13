项目基于nodejs的Express框架构建。
1.入口为bin\start，创建服务器，引入app.js，通过start创建的CreateServer函数的回调来处理所有请求与响应。
2.app调用相关的中间件，app.use()。并定义路由路径，交给相应的控制器处理，如index.js、user.js，再由res.render('html模板引擎','返回数据')渲染页面。


目录结构
bin——存放命令行程序。
node_modules——存放所有的项目依赖库。
public——存放静态文件，包括css、js、img等。
routes——存放路由文件。
views——存放页面文件（ejs模板）。
app.js——程序启动文件。
package.json——项目依赖配置及开发者信息。


新建模块supervisor，最好全局安装npm install -g supervisor，这样启动程序时（如app.js）可以 supervisor app启动，
这样它会监视你的代码，一旦代码修改了就会自动重启服务，不必手动，调试很方便。


响应对象（res）的方法向客户端返回响应,方法描述:
res.download()	提示下载文件。
res.end()	终结响应处理流程。
res.json()	发送一个 JSON 格式的响应。
res.jsonp()	发送一个支持 JSONP 的 JSON 格式的响应。
res.redirect()	重定向请求。
res.render()	渲染视图模板。
res.send()	发送各种类型的响应。
res.sendFile	以八位字节流的形式发送文件。
res.sendStatus()	设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。

实时监听public/sass下面的所有.scss为后缀的文件，并会将编译后的文件放到public/stylesheets
​sass --watch public/sass:public/stylesheets


1.http://m.v.zjol.com.cn/api/index/list接口updateTime均为null
2.images相对路径处理
3.时间戳问题


2016.7.25
1.原创出品http://api.v.zjol.com.cn/api/index/original查看更多
2.时政要闻http://m.v.zjol.com.cn/api/index/politics查看更多
3.热门http://m.v.zjol.com.cn/api/index/category/1查看更多