const TaskManager = require("./TaskManager");

class CLI {
    constructor() {
        this.taskManager = new TaskManager();
        this.colors = {
            reset: "\x1b[0m",
            green: "\x1b[32m",
            red: "\x1b[31m",
            yellow: "\x1b[33m",
            cyan: "\x1b[36m",
        };
    }

    // Print methods for user feedback
    printError(message) {
        console.log(`${this.colors.red}${message}${this.colors.reset}`);
    }

    printSuccess(message) {
        console.log(`${this.colors.green}${message}${this.colors.reset}`);
    }

    printInfo(message) {
        console.log(`${this.colors.cyan}${message}${this.colors.reset}`);
    }

    printWarning(message) {
        console.log(`${this.colors.yellow}${message}${this.colors.reset}`);
    }

    // Validate ID
    validateId(id) {
        if (!id || isNaN(parseInt(id))) {
            this.printError("Invalid ID. Please provide a valid number.");
            return false;
        }
        return true;
    }

    // List tasks
    listTasks(status) {
        const tasks = this.taskManager.listTasks(status);
        if (tasks.length === 0) {
            this.printWarning("No tasks found.");
            return;
        }
        this.printInfo(`Listing ${status ? status : "all"} tasks:`);
        tasks.forEach((task) => {
            const statusColor = task.completed
                ? this.colors.green
                : task.inProgress
                    ? this.colors.yellow
                    : this.colors.red;
            const statusText = task.completed
                ? "Done"
                : task.inProgress
                    ? "In-progress"
                    : "To-do";
            console.log(
                `${task.id}. ${task.description} [${statusColor}${statusText}${this.colors.reset}]`
            );
        });
    }

    // Add a task
    addTask(description) {
        if (!description) {
            this.printError("Please provide a task description.");
            this.printWarning("Sample: node index.js add \"Drink Water\"");
            return;
        }
        const newTask = this.taskManager.addTask(description);
        this.printSuccess(`Task added successfully! (ID: ${newTask.id})`);
    }

    // Update a task
    updateTask(id, newDescription) {
        if (!this.validateId(id) || !newDescription) {
            this.printError("Please provide a valid task ID and new description.");
            this.printWarning(
                "Sample: node index.js update 1 \"Updated task description\""
            );
            return;
        }
        if (this.taskManager.updateTask(parseInt(id), newDescription)) {
            this.printSuccess(`Task ID ${id} updated successfully!`);
        } else {
            this.printError(`Task with ID ${id} not found.`);
        }
    }

    // Delete a task
    deleteTask(id) {
        if (!this.validateId(id)) return;
        if (this.taskManager.deleteTask(parseInt(id))) {
            this.printSuccess(`Task ID ${id} deleted successfully!`);
        } else {
            this.printError(`Task with ID ${id} not found.`);
        }
    }

    // Mark a task as in-progress
    markInProgress(id) {
        if (!this.validateId(id)) return;
        if (this.taskManager.markInProgress(parseInt(id))) {
            this.printSuccess(`Task ID ${id} marked as in-progress.`);
        } else {
            this.printError(`Task with ID ${id} not found.`);
        }
    }

    // Mark a task as done
    markDone(id) {
        if (!this.validateId(id)) return;
        if (this.taskManager.markDone(parseInt(id))) {
            this.printSuccess(`Task ID ${id} marked as done.`);
        } else {
            this.printError(`Task with ID ${id} not found.`);
        }
    }

    // Print usage instructions
    printUsage() {
        this.printInfo("Usage: node index.js <command> [arguments]");
        this.printInfo("Commands:");
        this.printWarning("  add <task description>            - Add a new task");
        this.printWarning("  list [status]                     - List tasks (status: done, to-do, in-progress)");
        this.printWarning("  update <id> <new description>     - Update a task by ID");
        this.printWarning("  delete <id>                       - Delete a task by ID");
        this.printWarning("  mark-in-progress <id>             - Mark a task as in-progress by ID");
        this.printWarning("  mark-done <id>                    - Mark a task as done by ID");
    }

    // Parse and execute commands
    execute() {
        const args = process.argv.slice(2);
        const command = args[0];

        switch (command) {
            case "add":
                this.addTask(args.slice(1).join(" "));
                break;
            case "list":
                this.listTasks(args[1]);
                break;
            case "update":
                this.updateTask(args[1], args.slice(2).join(" "));
                break;
            case "delete":
                this.deleteTask(args[1]);
                break;
            case "mark-in-progress":
                this.markInProgress(args[1]);
                break;
            case "mark-done":
                this.markDone(args[1]);
                break;
            default:
                this.printUsage();
                break;
        }
    }
}

module.exports = CLI;