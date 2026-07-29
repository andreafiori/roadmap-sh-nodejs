// write a unit test for the Task class in Task.js using Jest
const Task = require('../../src/task-tracker/Task');

describe('Task class', () => {

    test('should create a new task with the given id and description', () => {
        const task = new Task(1, 'Test task');
        expect(task.id).toBe(1);
        expect(task.description).toBe('Test task');
    });

    test('should mark a task as in-progress', () => {
        const task = new Task(1, 'Test task');
        task.markInProgress();
        expect(task.inProgress).toBe(true);
        expect(task.completed).toBe(false);
    });

    test('should mark a task as done', () => {
        const task = new Task(1, 'Test task');
        task.markDone();
        expect(task.completed).toBe(true);
        expect(task.inProgress).toBe(false);
    });

    test('should update the task description', () => {
        const task = new Task(1, 'Test task');
        task.updateDescription('Updated task');
        expect(task.description).toBe('Updated task');
    });

    // test('should not allow marking a completed task as in-progress', () => {
    //     const task = new Task(1, 'Test task');
    //     task.markDone();
    //     task.markInProgress();
    //     expect(task.inProgress).toBe(false);
    //     expect(task.completed).toBe(true);
    // });

});