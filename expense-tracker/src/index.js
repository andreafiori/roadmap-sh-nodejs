#!/usr/bin/env node

const { program } = require("commander");
const ExpenseTracker = require("./ExpenseTracker");

const tracker = new ExpenseTracker();

// Define subcommands
program
    .command("add")
    .description("Add a new expense")
    .requiredOption("-d, --description <string>", "Expense description")
    .requiredOption("-a, --amount <number>", "Expense amount", Number.parseFloat)
    .action((options) => {
        const newExpense = tracker.addExpense(options.description, options.amount);
        console.log(`Expense added successfully (ID: ${newExpense.id})`);
    });

program
    .command("list")
    .description("List all expenses")
    .action(() => {
        const expenses = tracker.listExpenses();
        console.table(expenses);
    });

program
    .command("summary")
    .description("Get expense summary for a specific month or all-time")
    .option("-m, --month <number>", "Month number (1-12)", Number.parseInt)
    .action((options) => {
        const { total, period } = tracker.getSummary(options.month);
        console.log(`Total expenses for ${period}: $${total}`);
    });

program
    .command("delete")
    .description("Delete an expense by ID")
    .requiredOption("-i, --id <number>", "Expense ID", Number.parseInt)
    .action((options) => {
        const isDeleted = tracker.removeExpense(options.id);
        if (isDeleted) {
            console.log(`Expense with ID ${options.id} deleted successfully.`);
        } else {
            console.log(`Expense with ID ${options.id} not found.`);
        }
    });

// Parse arguments
program.parse(process.argv);
