# Env checker

A Node.js CLI tool to check whether required environment variables are set.

## Examples

```bash
npm run env-checker -- PATH
npm run env-checker -- PATH API_KEY DATABASE_URL
npm run env-checker
 ```

## Constraints

On successful execution, the output should look like this:

```bash
Set: PATH
All required environment variables are set.
```

If one or more environment variables are missing, print a friendly error:

```bash
error: missing environment variables: API_KEY, DATABASE_URL
```

If the user does not pass any names, print this error:

```bash
error: please provide at least one environment variable name
```

If the user does not pass any names, print this error:

```bash
Errors should go to stderr, and the command should set a non-zero exit code.
```

Do not print the actual values of environment variables. Some of them may be secrets.
