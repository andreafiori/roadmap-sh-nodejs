# Env checker

A Node.js CLI tool to check whether required environment variables are set.

## Examples

	node env-checker.js PATH
	node env-checker.js PATH API_KEY DATABASE_URL
	node env-checker.js

## 

On successful execution, the output should look like this:

	Set: PATH
	All required environment variables are set.

If one or more environment variables are missing, print a friendly error:
	
	error: missing environment variables: API_KEY, DATABASE_URL

If the user does not pass any names, print this error:
	
	error: please provide at least one environment variable name

If the user does not pass any names, print this error:

	Errors should go to stderr, and the command should set a non-zero exit code.

Do not print the actual values of environment variables. Some of them may be secrets.

The goal of this project is to practice reading command arguments, using process.env, printing helpful errors, and avoiding accidental secret leaks in terminal output.

You will need these Node.js APIs:

- process.argv to read the required environment variable names from the terminal.
- process.env to check which environment variables are set for the current process.
- process.exitCode to mark the command as failed without forcing an early crash.
