class Task {
    constructor(id, description, completed = false, inProgress = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
        this.inProgress = inProgress;
    }

    markInProgress() {
        this.inProgress = true;
        this.completed = false;
    }

    markDone() {
        this.completed = true;
        this.inProgress = false;
    }

    updateDescription(newDescription) {
        this.description = newDescription;
    }
}

module.exports = Task;