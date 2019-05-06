"use strict";
const exec = require("child_process").exec;
const chalk = require("chalk");


module.exports = tplInfo => {
  return new Promise(resolve => {
    const { url, branch, projectName } = tplInfo;
    if (!url || !branch) {
      console.log(
        chalk.red("\n × 项目模板配置信息有误：url 或 branch 属性为空！")
      );
      process.exit();
    }
    // 远程拉取项目并自定义项目名
    const cmdStr = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`;
    exec(cmdStr, resolve);
  });
};
