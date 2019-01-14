# BallHub 前端
A web application for organizing basketball activity

> 本项目基于开源项目 [vueAdmin-Template](https://github.com/PanJiaChen/vueAdmin-template) 修改而成
> 根据 MIT 开源协议，将 LICENSE 内容 (包括 Copyright) 放在根目录的 `vueAdmin-Template-LICENSE` 中

## 运行端口
> 7000

## 使用本地数据库
> localhost:8000

## 前置安装
+ npm
+ nginx

## 开发环境部署
```
npm i
npm start
```

## 生产环境部署
```
npm run build
sudo cp -r dist /usr/share/nginx
```

## nginx 配置
```
sudo cp nginx/BallHub.conf /etc/nginx/conf.d
sudo nginx -s reload
```