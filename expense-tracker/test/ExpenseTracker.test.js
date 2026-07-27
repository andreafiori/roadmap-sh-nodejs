const fs = require("node:fs");
const path = require("node:path");

const ExpenseTracker = require("../src/ExpenseTracker");

describe("ExpenseTracker", () => {
    let tracker;
    const testFilePath = path.join(__dirname, "test-expenses.json");

    beforeEach(() => {
        // Create a fresh test file before each test
        tracker = new ExpenseTracker(testFilePath);
        fs.writeFileSync(testFilePath, JSON.stringify([]));
    });

    afterEach(() => {
        // Clean up the test file after each test
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
    });

    test("addExpense adds an expense", () => {
        const newExpense = tracker.addExpense("Lunch", 20);
        expect(newExpense.description).toBe("Lunch");
        expect(newExpense.amount).toBe(20);
        expect(newExpense.id).toBe(1);
    });

    test("removeExpense removes an expense by ID", () => {
        tracker.addExpense("Lunch", 20);
        const isDeleted = tracker.removeExpense(1);
        expect(isDeleted).toBe(true);
        expect(tracker.getExpenses()).toHaveLength(0);
    });

    test("getSummary returns the correct total", () => {
        tracker.addExpense("Lunch", 20);
        tracker.addExpense("Dinner", 30);
        const { total } = tracker.getSummary();
        expect(total).toBe(50);
    });
});