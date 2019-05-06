"use strict";
const exec = require("child_process").exec;
const inquirer = require("inquirer");

module.exports = ({ projectName }) => {
  return new Promise(resolve =>
    inquirer
      .prompt([
        {
          type: "confirm",
          message: "是否集成 TypeScript ？",
          name: "useTs"
        }
      ])
      .then(({ useTs }) =>
        exec(
          `npx create-react-app ${projectName} ${useTs ? "--typescript" : ""}`,
          resolve
        )
      )
  );
};
