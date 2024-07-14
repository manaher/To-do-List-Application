#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string [] = [];
let conditions = true;

console.log(chalk.magentaBright.bold("\n \t Welcome to Manaher's To do List Application\n"));

let main = async () => {
    while(conditions){
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.redBright("\n Select an option you want to do:\n"),
                choices: ["Add task", "Delete task", "Update task", "View To do list", "Exit"],
            }
        ]);
        if (option.choice === "Add task"){
            await addTask()
        }
        else if(option.choice === "Delete task"){
            await deleteTask()
        }
        else if(option.choice === "Update task"){
            await updateTask()
        }
        else if(option.choice === "View To do list"){
            await viewTask()
        }
        else if(option.choice === "Exit"){
            conditions= false;
        }
    }
}

//Function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.yellowBright("\nEnter your new task:\n"),
        }
    ])
    todoList.push(newTask.task);
    console.log(chalk.greenBright(`\n ${newTask.task} task added successfully in To do list`));
}

//Function to view all the to do list tasks
let viewTask = () => {
    console.log(chalk.greenBright.bold("\n Your To do list: \n"));
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`)
    })
}

//Function to delete a task from list
let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.greenBright("\nEnter the index number of the task you want to delete:\n")
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n ${deletedTask} task has been deleted successfully from your To do list \n`)
}

//Function to update the task in the list
let updateTask = async () => {
    await viewTask()
    let updateTaskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellowBright("\nEnter the index number of the task you want to update:\n"),
        },
        {
            name: "newTask",
            type: "input",
            message: chalk.yellowBright("\nNow enter your new task name:\n")
        }
    ]);
    todoList[updateTaskIndex.index - 1] = updateTaskIndex.newTask
    console.log(`\n Task at index number ${updateTaskIndex.index} updated successfully [For updated list check option "View To do list"]`)
}

main();