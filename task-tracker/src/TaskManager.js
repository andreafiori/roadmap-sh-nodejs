const fs = require("node:fs");
const path = require("node:path");
const Task = require("./Task");

class TaskManager {
    constructor(filePath = path.join(__dirname, "tasks.json")) {
        this.filePath = filePath;
        this.tasks = this.readTasks(); // Recover old tasks
    }

    readTasks() {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, "utf8");
            const tasksData = JSON.parse(data);
            return tasksData.map(
                (task) => new Task(task.id, task.description, task.completed, task.inProgress)
            );
        }
        return [];
    }

    writeTasks() {
        fs.writeFileSync(
            this.filePath,
            JSON.stringify(this.tasks, null, 2),
            "utf8"
        );
    }

    getNextId() {
        const usedIds = new Set(this.tasks.map((task) => task.id));
        let nextId = 1;
        while (usedIds.has(nextId)) nextId++;
        return nextId;
    }

    addTask(description) {
        const newTask = new Task(this.getNextId(), description);
        this.tasks.push(newTask);
        this.writeTasks();
        return newTask;
    }

    updateTask(id, newDescription) {
        const task = this.findTask(id);
        if (task) {
            task.updateDescription(newDescription);
            this.writeTasks();
            return true;
        }
        return false;
    }

    deleteTask(id) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter((task) => task.id !== id);
        if (this.tasks.length < initialLength) {
            this.writeTasks();
            return true;
        }
        return false;
    }

    deleteAllTasks() {
        this.tasks = [];
        this.writeTasks();
    }

    findTask(id) {
        return this.tasks.find((task) => task.id === id);
    }

    markInProgress(id) {
        const task = this.findTask(id);
        if (task) {
            task.markInProgress();
            this.writeTasks();
            return true;
        }
        return false;
    }

    markDone(id) {
        const task = this.findTask(id);
        if (task) {
            task.markDone();
            this.writeTasks();
            return true;
        }
        return false;
    }

    listTasks(status) {
        const statusFilters = {
            done: (task) => task.completed,
            "to-do": (task) => !task.completed && !task.inProgress,
            "in-progress": (task) => task.inProgress,
        };

        if (status && !statusFilters[status.toLowerCase()]) {
            return []; // Return an empty array for invalid statuses
        }

        return status
            ? this.tasks.filter(statusFilters[status.toLowerCase()])
            : this.tasks;
    }
}

module.exports = TaskManager;