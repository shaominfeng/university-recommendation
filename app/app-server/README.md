<h1 align="center">University Recommend</h1>

<div align="center">
This is a scaffolding project,it can quickly help you start your project.
</div>

- Node:https://nodejs.org/

## Required
1. Node > 16.14.2
2. Git


## Quick Start

```js
$ mkdir <your-project-name>
$ cd <your-project-name>
$ git clone 'git@github.com:shaominfeng/UniversityRecommend.git'
$ npm install
$ npm start         # visit http://localhost:3000/
```
1. You need install nvm 1.1.9(< 1.1.9 will meet some bug) from here, and then install node v16.14.2 by nvm (nvm install 16.14.2 & nvm use 16.14.2).
2. And then, you need clone the repo. Run `git@github.com:shaominfeng/react-ant-design-start.git` in work folder.
3. cd to react-ant-design-start folder. Run `npm install` in this path.
4. `npm run start`

## Feature
- :bulb: 输入当年高考成绩，可以自动根据数据计算推荐对应排名的学校
- :scroll: 数据支持到江苏省2021年各学校录取分数以及排名

## TODO
1. 江苏省2022年所有学校的录取情况数据
2. 扩展更多数据，比如民办/公办，学校属性（985/211），专业录取分数
3. 支持更多省份，尤其是高考人数众多的省份，比如河南，山东问的比较多

## Contributing

Any type of contribution is welcome, here are some examples of how you may contribute to this project:

- Submit [issues](https://github.com/shaominfeng/UniversityRecommend/issues) to report bugs or ask questions.
- Propose [pull requests](https://github.com/shaominfeng/UniversityRecommend/pulls) to improve our code.

**报参数无效**
检查dist里面的src/file ，可能缺少file文件夹
pm2 start /usr/src/app/university/dist/src/main.js
