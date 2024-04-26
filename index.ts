#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

//initialize user balance and pin code
let myBalance = 5000;
let myPin = 2244;

// Print Wellcome Message
console.log(chalk.yellow("\n \tWellcome to my code - Atm Machine\n "));

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: chalk.blue("Enter your pin code:"),
  }
])
if (pinAnswer.pin === myPin) {
  console.log(chalk.green("\n \tPin is correct, Login successfully!\n"));
  //console.log(`Current Account Balance is ${myBalance}`)

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: "Select an operation:",
      choices: ["Withdraw Amount", "Check Balance"]
    }
  ])
  if (operationAns.operation === "Withdraw Amount") {
    let withdrawAns = await inquirer.prompt([
      {
        name: "withdrawMethod",
        type: "list",
        message: "Select a withdrawl method:",
        choices: ["Fast cash", "Enter Amount"]
      }
    ])
    if (withdrawAns.withdrawMethod === "Fast cash") {
      let fastCashAns = await inquirer.prompt([
        {
          name: "fastCash",
          type: "list",
          message: "SelectAmount:",
          choices: ["1000", "2000", "5000", "10000", "20000"]
        }
      ])
      if (fastCashAns.fastCash > myBalance) {
        console.log(chalk.red("Insufficient Balance"));
      } 
      else {
        myBalance -= fastCashAns.fastCash
        console.log(`${fastCashAns.fastCash} Withdraw successfully`);
        console.log(chalk.yellow(`Your Remaining Balance is: ${myBalance}`));
      }
    } if (withdrawAns.withdrawMethod === "Enter Amount") {
      let amountAns = await inquirer.prompt([
        {
          name: "amount",
          type: "number",
          message: "Enter the amount to Withdraw:",
        }
      ])
      if (amountAns.amount > myBalance) {
        console.log(chalk.red("Insufficient Balance"));
      } else {
        myBalance -= amountAns.amount;
        console.log(`${amountAns.amount} Withdraw Successfully`);
        console.log(chalk.yellow(`Your Remaining Balance is: ${myBalance}`));
      }
    }
   } else if (operationAns.operation === "Check Balance") {
      console.log(chalk.green(`Your Account Balance is: ${myBalance}`));
    }
} else {
  console.log(chalk.green("Pin is Incorrect, Try Again!"));
}
