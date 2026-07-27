const fs = require("node:fs");
const path = require("node:path");

class ExpenseTracker {
    constructor(filePath = path.join(__dirname, "expenses.json")) {
        this.filePath = filePath;
        this.initializeFile();
    }

    /**
     * Initialize the JSON file if it doesn't exist.
     */
    initializeFile() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
        }
    }

    /**
     * Get all expenses from the file.
     * @returns {Array} expenses
     */
    getExpenses() {
        return JSON.parse(fs.readFileSync(this.filePath, "utf8"));
    }

    /**
     * Save expenses to the file.
     * @param {Array} expenses
     */
    saveExpenses(expenses) {
        fs.writeFileSync(this.filePath, JSON.stringify(expenses, null, 2));
    }

    /**
     * Add a new expense.
     * @param {string} description
     * @param {number} amount
     * @returns {Object} The added expense
     */
    addExpense(description, amount) {
        const expenses = this.getExpenses();
        const newExpense = {
            id: expenses.length + 1,
            date: new Date().toLocaleDateString(),
            description,
            amount,
        };

        expenses.push(newExpense);
        this.saveExpenses(expenses);
        return newExpense;
    }

    /**
     * Remove an expense by ID.
     * @param {number} id
     * @returns {boolean} True if deleted, false if not found
     */
    removeExpense(id) {
        let expenses = this.getExpenses();
        const filteredExpenses = expenses.filter((expense) => expense.id !== id);

        if (filteredExpenses.length === expenses.length) {
            return false; // Not found
        }

        this.saveExpenses(filteredExpenses);
        return true; // Deleted
    }

    /**
     * Get expense summary for a specific month or all-time.
     * @param {number} [month]
     * @returns {Object} Summary with total and period
     */
    getSummary(month) {
        const expenses = this.getExpenses();
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
        ];

        const filteredExpenses = month
            ? expenses.filter(
                (expense) => new Date(expense.date).getMonth() + 1 === month
            )
            : expenses;

        const total = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        const period = month ? months[month - 1] : "all time";

        return { total, period };
    }

    /**
     * List all expenses.
     * @returns {Array} Formatted expenses
     */
    listExpenses() {
        return this.getExpenses().map(({ id, date, description, amount }) => ({
            Id: id,
            Date: date,
            Description: description,
            Amount: `$${amount}`,
        }));
    }
}

module.exports = ExpenseTracker;