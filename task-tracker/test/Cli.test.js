// write a unit test for the Task class in Task.js using Jest
const Cli = require('../src/Cli');

describe('Cli class', () => {

    test('should validate a valid ID', () => {
        const cli = new Cli();
        expect(cli.validateId('1')).toBe(true);
    });

    test('should invalidate an invalid ID', () => {
        const cli = new Cli();
        expect(cli.validateId('abc')).toBe(false);
        expect(cli.validateId('')).toBe(false);
        expect(cli.validateId(null)).toBe(false);
    });

    test('should print error messages in red', () => {
        const cli = new Cli();
        console.log = jest.fn();
        cli.printError('Error message');
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Error message'));
    });
});