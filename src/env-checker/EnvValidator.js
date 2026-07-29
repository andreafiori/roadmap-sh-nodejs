class EnvValidator {
    constructor(env = process.env) {
        this.env = env;
    }

    printError(message) {
        console.error(`error: ${message}`);
        return { success: false, message };
    }

    getMissingNames(names) {
        if (!Array.isArray(names)) {
            throw new TypeError("names must be an array");
        }
        return names.filter((name) => !(name in this.env));
    }

    printSuccess(names) {
        names.forEach((name) => console.log(`Set: ${name}`));
        console.log("All required environment variables are set.");
        return { success: true };
    }

    validateInput(names) {
        if (!names || names.length === 0) {
            return this.printError("please provide at least one environment variable name");
        }
        return null;
    }

    checkEnvironmentVariables(names) {
        const error = this.validateInput(names);
        if (error) return error;

        const missingNames = this.getMissingNames(names);
        if (missingNames.length > 0) {
            return this.printError(`missing environment variables: ${missingNames.join(", ")}`);
        }
        return this.printSuccess(names);
    }

    main() {
        const requiredNames = process.argv.slice(2);
        const result = this.checkEnvironmentVariables(requiredNames);
        if (!result.success) {
            process.exitCode = 1;
        }
    }
}

module.exports = EnvValidator;