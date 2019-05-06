"use strict";
const exec = require("child_process").exec;
const co = require("co");
// const prompt = require("co-prompt");
const chalk = require("chalk");
const inquirer = require("inquirer");
const config = require("../templates");

const tplList = Object.keys(config.tpl).map(
  key => `${key}(${config.tpl[key].name})`
);

module.exports = () => {
  co(function*() {
    // 配置输入
    inquirer
      .prompt([
        {
          type: "list",
          message: "请选择项目模板:",
          name: "tpl",
          choices: tplList,
          default: tplList[0]
        },
        {
          type: "input",
          message: "请输入项目名称:",
          name: "projectName",
          default: "light-demo",
          validate: function(val) {
            if (!val.trim()) {
              return chalk.red("\n × 项目名称不能为空!");
            }
            return true;
          }
        }
      ])
      .then(({ tpl, projectName }) => {
        const tplKey = tpl.split("(")[0];
        const tplInfo = config.tpl[tplKey];
        const { startCmd, shellPath } = tplInfo;
        const createApp = require(shellPath);

        console.log(chalk.white("\n 开始初始化项目..."));

        createApp({ ...tplInfo, projectName }).then((error, stdout, stderr) => {
          if (error) {
            console.log(chalk.red("\n × 项目初始化失败!"));
            console.error(error);
            process.exit();
          }

          console.log(chalk.green("\n √ 项目初始成功!"));

          if (startCmd) {
            console.log(
              `\n -----------------------------------------------------------`
            );
            console.log(`\n 请执行下列指令，启动项目:`);
            console.log(`\n cd ${projectName}`);
            console.log(`\n ${startCmd}`);
          }
          process.exit();
        });
      });
  });
};
