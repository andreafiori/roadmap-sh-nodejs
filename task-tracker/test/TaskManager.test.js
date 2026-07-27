// write a unit test for the Task class in Task.js using Jest
const TaskManager = require('../src/TaskManager');

describe('TaskManager class', () => {

    beforeEach(() => {
        // Clear tasks before each test
        const taskManager = new TaskManager();
        taskManager.deleteAllTasks();
    });

    test('should add a new task and return it', () => {
        const taskManager = new TaskManager();
        const newTask = taskManager.addTask('Test task');
        expect(newTask.id).toBe(1);
        expect(newTask.description).toBe('Test task');
    });

    test('should list all tasks', () => {
        const taskManager = new TaskManager();
        taskManager.addTask('Task 1');
        taskManager.addTask('Task 2');
        const tasks = taskManager.listTasks();
        expect(tasks).toHaveLength(2);
    });

});