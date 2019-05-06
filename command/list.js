"use strict";
const chalk = require("chalk");
const config = require("../templates");

module.exports = () => {
  const tplList = Object.keys(config.tpl).map(key => ({
    模板名称: key,
    描述: config.tpl[key].name
  }));
  console.table(tplList);
  process.exit();
};
